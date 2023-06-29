/**
 * @TODO finish writing function
 * This utility reads the CustomColorSettings.xml whose filepath is passed as an argument and exports each color block as
 * an individual JSON file.
 * @param {String}  filepath  The provided filepath to the CustomColorSettings.xml file.
 */

const fs = require('fs')
const { XMLParser, XMLBuilder } = require('fast-xml-parser')

const INPUT_FILE = process.argv.slice(2)[0]
const OUTPUT_DIR = process.env.NODE_ENV == 'env' ? `../.temp/XMLSplitter` : ``

const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "self_",
  format: true,
  indentBy: "	",
  preserverOrder: true,
  allowBooleanAttributes: true,
  suppressUnpairedNode: false,
  unpairedTags: [
    "add_closure",
    "input",
    "output",
    "vector",
    "vector_transform",
    "connect",
    "group_input",
    "group_output"
  ]
}

const parser = new XMLParser(options)
const builder = new XMLBuilder(options)

fs.readFile(INPUT_FILE, (err, data) => {
  if (err) throw err
  const xml = parser.parse(data)
  for(material of xml.eyesight.material) {
    let color = new Object()
    color.material = material
    fs.writeFile(`${OUTPUT_DIR}/xml/${color.material.self_name}.xml`, builder.build(color), (err) => {if (err) throw err})
  }
  fs.writeFile(`${PUTPUT_DIR}/json/XMLasJSON.json`, JSON.stringify(xml, null, 4), (err) => {
    if (err) throw err
  })
  //log(builder.build(xml))
})