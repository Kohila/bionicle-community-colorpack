/** @module common */

import fs from "fs"
import path from "path"
import { YAMLtoJSON } from "./converters.js"

/**
 * @typedef {import("./typedefs.js").Color}
 */

/**
 * This function is a NODE_ENV dependant wrapper for console.log() to be used for debugging.
 * @param {any} a The item to log to the debugger.
 */
export const debug = (a) => {
  (process.env.NODE_ENV?.trim() == "development") && console.log(`[DEBUG] ${a}`)
}

/**
 * This constant returns the path of the directory root.
 */
export const root = process.cwd()

/**
 * This function reads a filepath and returns a list of all non-directory child files of
 * that filepath. Can optionally be executed at recursive depth.
 * @param {string} dir The filepath of the directory to list.
 * @param {boolean} recursive Recursively add nested folders to directory list. Defaults to false.
 * @return {string[]} Returns an array of all filepaths.
 */
export const getDirectoryContents = (dir, recursive = false) => {
  let files = []
  const items = fs.readdirSync(dir, { withFileTypes: true, recursive })

  for (const item of items) {
    const itemPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      files = [...files, ...getDirectoryContents(itemPath)]
    } else {
      files.push(itemPath)
    }
  }

  return files
}

/**
 * This function returns an array containing the filepaths of all color definitions in the [colors/] directory.
 * @todo Will need to be modified to filter by the correct file extension once decided per {@link https://github.com/Kohila/bionicle-community-colorpack/issues/4 #4}
 * @param {string} location The file path of the color directory folder. Default: "colors".
 * @return {string[]}
 */
export const getColorPaths = (location = "colors") => {
  const colorsPath = path.join(root, location)
  const colorsList = getDirectoryContents(colorsPath)
  const colors = colorsList.filter((file) => file.endsWith(".yaml"))
  debug(`Colors found: ${colors.length}`)
  return colors
}

/**
 * This function returns an array containing the deserialized JS objects of all color definitions in the
 * [colors/] directory.
 * @return {Color[]}
 */
export const getColorObjects = async () => {
  const objects = new Array()

  const colorPaths = getColorPaths(".temp/colors")

  for (const path of colorPaths) {
    const data = fs.readFileSync(path)
    const color = YAMLtoJSON(data.toString())
    console.log(`Color found: ${color.definition.name.studio}`)
    objects.push(color.definition)
  }
  return objects
}

/**
 * This function reads the data from a .JSON file and deserializes it into a JS object.
 * @param {string} filepath The filepath of a .JSON file.
 * @returns {object} The deserialized JS object.
 */
export const readJsonFromFile = (filepath) => {
  const file = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(file)
}