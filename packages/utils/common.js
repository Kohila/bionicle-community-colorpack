/** @module common */
import fs from "fs"
import path from "path"

/**
 * This function is a NODE_ENV dependant wrapper for console.log() to be used for debugging.
 * @param {any} a The item to log to the debugger.
 */
export const debug = (a) => {
  process.env.NODE_ENV.trim() == "development" && console.log(`[DEBUG] ${a}`)
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
 * @return {string[]}
 */
export const getColorPaths = () => {
  const colorsPath = path.join(root, "colors")
  const colorsList = getDirectoryContents(colorsPath)
  const colors = colorsList.filter((file) => file.endsWith(".js"))
  debug(`Colors found: ${colors.length}`)
  return colors
}

/**
 * This function returns an array containing the deserialized JS objects of all color definitions in the
 * [colors/] directory.
 * @return {Color[]}
 */
export const getColorObjects = async () => {
  const colors = new Array()

  const colorPaths = getColorPaths()

  for (const color of colorPaths) {
    const data = await import(path.join("file:\\\\", color))
    debug(`Color found: ${data.color.name.studio}`)
    colors.push(data.color)
  }

  return colors
}

/**
 *
 * @param {object} obj The JS object to flatten
 * @param {string | null} parentKey The name of an object's parent key, used during recursion. Defaults to null.
 * @returns {object}
 */
export const flattenObject = (obj, parentKey = null) => {
  let result = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const newKey = parentKey ? parentKey + "." + key : key
    if (typeof value === "object") {
      result = { ...result, ...flattenObject(value, newKey) }
    } else {
      result[newKey] = value
    }
    log(`parentKey: "${parentKey}", _key: "${newKey}"`)
  })

  return result
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
