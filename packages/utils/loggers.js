/** @module loggers */
import fs from "fs"
import path from "path"
import {
  flattenObject,
  getColorObjects,
  getColors as getColorPaths,
  getDirectoryContents,
  readJsonFromFile,
  root,
} from "./common.js"


const logPath = path.join(root, '.log')

/**
 * @deprecated
 * @TODO Write script!!
 * This script analyses every color definition in CustomColorDefinition.txt and outputs any and all missing
 * attributes to a log file
 */
export const colorAttributesNeeded = () => {
  const logOutput = path.join(logPath, `missing-attributes-${Date.now()}.log`)

  !fs.existsSync(logPath) && fs.mkdirSync(logPath)

  const writeStream = fs.createWriteStream(logOutput, {encoding: "utf-8"})

  const colors = getColorObjects()

  for (const color of colors) {
    writeStream.write(JSONtoTSV(color) + "\n")
  }

  // for (let file of files) {
  //   const color = flattenObject(readJsonFromFile(file))
  //   Object.keys(color).forEach((key) => {
  //     color[key].length == 0 &&
  //       fs.appendFileSync(
  //         OUTPUT_FILE,
  //         `[NULL] Empty Attribute '${key}' for: '${file}'\n`
  //       )
  //   })
  // }
}
