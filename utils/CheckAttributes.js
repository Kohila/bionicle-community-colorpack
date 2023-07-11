/**
 * @TODO Write script!!
 * This script analyses every color definition in CustomColorDefinition.txt and outputs any and all missing 
 * attributes to a log file 
 */

const fs = require('fs')
const { getDirectoryContents,readJsonFromFile, flattenObject } = require("./common")

const OUTPUT_DIR = './.log'
const INPUT_DIR = process.env.NODE_ENV == 'production' ? `./colors` : `./.temp/TXTtoJSON`
const OUTPUT_FILE = `${OUTPUT_DIR}/NeededAttributes.log`

console.log(__dirname)

!fs.existsSync(OUTPUT_DIR) && fs.mkdirSync(OUTPUT_DIR)

fs.writeFileSync(OUTPUT_FILE, '')

const fileList = getDirectoryContents(INPUT_DIR)

//console.log(fileList)

for (let file of fileList) {
  const color = (flattenObject(readJsonFromFile(file)))
  Object.keys(color).forEach(key => {
    (color[key].length == 0) && fs.appendFileSync(OUTPUT_FILE, `[NULL] Empty Attribute '${key}' for: '${file}'\n`)
  })
}