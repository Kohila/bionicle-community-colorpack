/**
 * This script is used to "patch" existing .IO files that use previously established BDBCC colors.
 */
const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const unzipper = require("unzipper")
const archiver = require("archiver")
const archiverZipEncrypted = require("archiver-zip-encrypted")
const definitions = require("./definitions")
const STUDIO_PASSWORD = "soho0909"
archiver.registerFormat("zip-encrypted", archiverZipEncrypted)

const patcher = async (targets) => {
  for (const target of targets) {
    const targetType = fileTypes(target)

    if (targetType == "IO") {
      // IO File conversion logic here
      // console.log("IO Logic . . .")
      console.log(`[INFO] Patching: ${target}`)
      await patchFile(target)
      console.log(`[INFO] Patched: ${target}`)
    }

    if (targetType == "DIR") {
      // Directory conversion logic here. Recursive...?
      console.log("Directory logic . . .")
    }
  }

  await inquirer
    .prompt([
      { type: "input", name: "exit", message: "Press any key to exit: " },
    ])
    .then()
}

const patchFile = async (input) => {
  const archive = archiver.create("zip-encrypted", {
    encryptionMethod: "zip20",
    password: STUDIO_PASSWORD,
  })

  archive.on("warning", (err) => {
    if (!(err.code === "ENOENT")) throw err
  })

  archive.on("error", (err) => {
    throw err
  })

  path.format({ ...path.parse(input), base: "", ext: ".zip" })
  const dir = await unzipper.Open.file(input)

  console.log(input)

  const output = fs.createWriteStream(input)

  for (const file of dir.files) {
    console.log(file.path.split(".").pop())
    if (file.path.split(".").pop() == "ldr") archive.append(await file.buffer(STUDIO_PASSWORD), { name: file.path })
  }

  archive.pipe(output)

  archive.finalize()
}

const fileTypes = (target) => {
  if (!fs.existsSync(target)) {
    console.error(`[ERROR] Argument "${target}" does not exist`)
    return null
  }
  if (fs.lstatSync(target).isDirectory()) return "Directory"
  if (fs.lstatSync(target).isFile()) {
    if (target.split(".").pop() == "io") return "IO"
    console.error(`[ERROR] Invalid file of type ".${target.split(".").pop()}"`)
    return null
  }
  return "Unknown error"
}

module.exports = {
  patcher,
}
