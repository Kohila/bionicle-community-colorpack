import { KeyObject } from 'crypto';
import fs from 'fs'

export const getDirectoryContents = ( dir ) => {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    if (item.isDirectory()) {
      files = [
        ...files,
        ...getDirectoryContents(`${dir}/${item.name}`),
      ];
    } else {
      files.push(`${dir}/${item.name}`)
    }
  }
  return files
}

export const readJsonFromFile = ( filepath ) => {
  const file = fs.readFileSync(filepath, 'utf-8')
  return JSON.parse(file)
}

export const flattenObject = ( obj, parentKey ) => {
  let result = {}

  Object.keys(obj).forEach((key) => {
    const value = obj[key]
    const newKey = parentKey ? parentKey + '.' + key : key
    if (typeof value === 'object') {
      result = { ...result, ...flattenObject(value, newKey) }
    } else {
      result[newKey] = value
    }
    console.log(`parentKey: "${parentKey}", _key: "${newKey}"`)
  })

  return result
}

module.exports = {
  getDirectoryContents,
  readJsonFromFile,
  flattenObject
}