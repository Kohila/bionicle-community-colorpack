/**
 * This script is used to "patch" existing .IO files that use previously established BDBCC colors.
 */


const fs = require("fs")
const path = require("path")
const unzipper = require("unzipper")
const archiver = require("archiver")
const archiverZipEncrypted = require("archiver-zip-encrypted")
const definitions = require('./definitions')

const patcher = async () => {
  archiver.registerFormat("zip-encrypted", archiverZipEncrypted)

  const STUDIO_PASSWORD = "soho0909"

  const FILE_INPUT = `./.temp/brick.io`
  const FILE_OUTPUT = `./.temp/newbrick.io`

  const ARCHIVE = archiver.create("zip-encrypted", {
    encryptionMethod: "zip20",
    password: STUDIO_PASSWORD,
  })

  path.format({ ...path.parse(FILE_INPUT), base: "", ext: ".zip" })

  const dir = await unzipper.Open.file(FILE_INPUT)

  for (const file of dir.files) {
    const FILE_NAME = file.path
    const FILE_CONTENTS = await file.buffer(STUDIO_PASSWORD)
/**
 * @TODO: Color ID replacement login on FILE_CONTENTS
 */
    console.log(FILE_NAME)
    ARCHIVE.append(FILE_CONTENTS, { name: FILE_NAME })
  }

  const OUTPUT = fs.createWriteStream(FILE_OUTPUT)

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  OUTPUT.on("close", () => {
    console.log(ARCHIVE.pointer() + " total bytes")
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    )
  })

  // This event is fired when the data source is drained no matter what was the data source.
  // It is not part of this library but rather from the NodeJS Stream API.
  // @see: https://nodejs.org/api/stream.html#stream_event_end
  OUTPUT.on("end", () => {
    console.log("Data has been drained")
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  ARCHIVE.on("warning", (err) => {
    if (err.code === "ENOENT") {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  // good practice to catch this error explicitly
  ARCHIVE.on("error", (err) => {
    throw err
  })

  ARCHIVE.pipe(OUTPUT)

  ARCHIVE.finalize()
}

module.exports = {
    patcher
}