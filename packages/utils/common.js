import fs from "fs"

/**
 * This function is a NODE_ENV dependant wrapper for console.log() to be used for debugging.
 * @param {any} a The item to log to the debugger.
 */
export const debug = (a) => {
  process.env.NODE_ENV === "development" && console.log(a)
}

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
    if (item.isDirectory()) {
      files = [...files, ...getDirectoryContents(`${dir}/${item.name}`)]
    } else {
      files.push(`${dir}/${item.name}`)
    }
  }

  return files
}

/**
 * 
 * @param {object} obj The JS object to flatten
 * @param {string | null} parentKey The name of an object's parent key, used during recursion.
 * @returns {object}
 */
export const flattenObject = (obj, parentKey) => {
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
 * @returns {object} The parsed JS object.
 */
export const readJsonFromFile = (filepath) => {
  const file = fs.readFileSync(filepath, "utf-8")
  return JSON.parse(file)
}