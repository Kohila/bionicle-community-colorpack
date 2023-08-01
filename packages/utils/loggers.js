/** @module loggers */
/**
 * @TODO Need to write more comprehensive log generators!
 */

import fs from "fs"
import path from "path"
import {
  getColorObjects,
  root,
} from "./common.js"
import flatten from "flat"


const LOG_PATH = path.join(root, '.log')

/**
 * @TODO Refactor
 * This script analyses every color definition in CustomColorDefinition.txt and outputs any and all missing
 * attributes to a log file
 */
export const colorAttributesNeeded = async () => {
  const logPath = path.join(root, ".log")
  const logOutput = path.join(logPath, `missing-attributes-${Date.now()}.log`)

  !fs.existsSync(logPath) && fs.mkdirSync(logPath)

  const writeStream = fs.createWriteStream(logOutput, {encoding: "utf-8"})

  const colors = await getColorObjects()

  for (const color of colors) {
    const flattened = flatten(color)
    Object.keys(flattened).forEach((key) => {
      flattened[key].length == 0 &&
        writeStream.write(
          `[NULL] Empty Attribute '${key}' for: '${color.name.studio}'\n`
        )
    })
  }
}