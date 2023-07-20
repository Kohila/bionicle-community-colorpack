/**
 * This script is used to "patch" existing .IO files that use previously established BDBCC colors.
 */

const fs = require("fs")
const path = require("path")
const inquirer = require("inquirer")
const unzipper = require("unzipper")
const ora = require("ora")
const archiver = require("archiver")
const archiverZipEncrypted = require("archiver-zip-encrypted")
archiver.registerFormat("zip-encrypted", archiverZipEncrypted)

const DEFINITIONS = require("./definitions")
const { EventEmitter } = require("stream")
const STUDIO_PASSWORD = "soho0909"

const patcher = async (targets) => {
  for (const target of targets) {
    const targetType = getFileType(target)

    targetType === "IO" && await patchFile(target)

    if (targetType === "DIR") {
      const readFiles = await fs.readdirSync(target)
      const files = readFiles.filter((file) => file.match(/.+\.io$/gi))

      for (let file of files) {
        await patchFile(file)
      }
    }
  }

  await inquirer
    .prompt([
      { type: "input", name: "exit", message: "Press any key to exit: " },
    ])
    .then()
}

const patchFile = async (input) => {

  const loader = owa({
    text: `[INFO] Patching file: ${input}`
  }).start()

  const archive = archiver.create("zip-encrypted", {
    encryptionMethod: "zip20",
    password: STUDIO_PASSWORD,
  })
  archive.on("warning", (err) => { if (!(err.code === "ENOENT")) throw err })
  archive.on("error", (err) => { throw err })

  path.format({ ...path.parse(input), base: "", ext: ".zip" })
  const dir = await unzipper.Open.file(input)

  const output = fs.createWriteStream(input)

  for (const file of dir.files) {
    console.log(file.path.split(".").pop())
    if (file.path.split(".").pop() == "ldr")
      archive.append(await file.buffer(STUDIO_PASSWORD), { name: file.path })
  }

  archive.pipe(output)

  archive.finalize()
  loader.succeed(`[PASS] Successfully patched file: "${input}"`)
}

const getFileType = (target) => {
  if (!fs.existsSync(target)) {
    console.error(`[ERROR] ${target} does not exist.`)
    return "ERR_DNE"
  }
  if (fs.lstatSync(target).isDirectory()) return "DIR"
  if (fs.lstatSync(target).isFile()) {
    if (target.split(".").pop() == "io") return "IO"
    console.error(`[ERROR] Invalid file of type ".${target.split(".").pop()}".`)
    return "ERR_NOTIO"
  }
  console.error(`[ERROR] An unknown error occured.`)
  return "ERR_UNK"
}

const spinner = () => {
  const load = ora({
    text: "Testing spinner . . .",
    suffixText: "TEST",
  }).start()

  setTimeout(() => {
    load.text = load.text + " Done!"
    load.succeed()
  }, 1000)
}

module.exports = {
  patcher,
  spinner,
}
