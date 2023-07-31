/** @module converters */
import flatten from "flat"
import xml2js from "xml2js"
import YAML from "yaml"

const TSV_ROWS = [
  "id.studio",
  "id.bricklink",
  "id.ldraw",
  "id.ldd",
  "name.studio",
  "name.bricklink",
  "name.ldraw",
  "name.ldd",
  "rgb",
  "alpha",
  "category.name",
  "groupId",
  "notes",
  "instructions.rgb",
  "instructions.cmyk",
  "category.nickname",
]

const COLOR_CATEGORIES = {
  MILKY: "Milky Colors",
  TRANS: "Transparent Colors",
  METAL: "Metallic Colors",
  SOLID: "Solid Colors",
  PEARL: "Pearl Colors",
  CHROME: "Chrome Colors",
  RUBBER: "Rubber Colors",
  GLITTER: "Glitter Colors",
  SPECKLE: "Speckle Colors",
  SATIN: "Satin Colors",
}

/**
 * Converts a JSON object to an XML string.
 * @param {object} object The JSON object to convert.
 * @return {string} The XML root element output as a string.
 */
export const JSONtoXML = (object) => {
  const xmlBuilder = new xml2js.Builder({
    headless: true
  })

  const parsedObject = parseJSONWithAttrkey(object)
  const xml = xmlBuilder.buildObject(parsedObject)
  return xml
}

/**
 * Converts a JSON object into a TSV row based on columns defined in TSV_ROWS.
 * @param {Object} object The JSON object to convert.
 * @return {string} The TSV row output as a string.
 */
export const JSONtoTSV = (object) => {
  const flatObject = flatten(object)
  let tsv = ""
  for (const key of TSV_ROWS) {
    tsv += `${TSV_ROWS.indexOf(key) === 0 ? "" : "\t"}${flatObject[key]}`
  }
  return tsv
}

/**
 * Converts a TSV string into a JS object based on columns defined in TSV_ROWS.
 * @param {string} string The TSV string to convert.
 * @returns {object} The JSON output as an object.
 */
export const TSVtoJSON = (string) => {
  const tsv = string.split("\t")

  const object = {}
  for (let i = 0; i < TSV_ROWS.length; i++) {
    object[TSV_ROWS[i]] = tsv[i]
  }

  return flatten.unflatten(object)
}

/**
 * Converts an XML element into a TSV row based on columns defined in TSV_ROWS.
 * @param {string} element The XML root element to convert.
 * @return {string} The TSV row output as a string.
 */
export const XMLtoTSV = (element) => {}

/**
 * Converts an XML element into a JS object.
 * @param {string} element The XML root element to convert.
 * @return {Object} The JSON output as a JS object.
 */
export const XMLtoJSON = async (element) => {
  const parser = new xml2js.Parser({
    attrNameProcessors: [(name) => {
      return `$${name}`
    }],
    mergeAttrs: true,
    explicitArray: false
  })
  const object = await parser.parseStringPromise(element)
  return object
}

/**
 * Converts a JS object into a YAML string.
 * @param {Object} object The JS object to convert.
 * @return {string} The YAML output as a string.
 */
export const JSONtoYAML = (object) => {
  const yaml = YAML.stringify(object)
  return yaml
}

/**
 * Parses a JS object with attrkey prefixes and expands it with attrkey properties.
 * @param {Object} object The JS object with prefix attributes to expand.
 * @return {Object} The JS object expanded with nested attributes.
 */
export const parseJSONWithAttrkey = (object) => {
  const flattened = flatten(object)
  const newObject = new Object()

  for (const prop in flattened) {
    const newProp = prop.replace(/\$/g, "$.")
    newObject[newProp] = flattened[prop]
  }
  return flatten.unflatten(newObject)
}

/**
 * 
 * @param {Number} value 
 * @returns {Number}
 */
export const parseRGBPercentage = (value) => {
  return (value / 255)
}

/**
 * 
 * @param {Color} object
 * @returns {string}
 */
export const parseSettingsNameFromDefinition = (object) => {
  const defName = object.name.studio
  const category = object.category.name

  const prefix = Object.keys(COLOR_CATEGORIES).find(key => COLOR_CATEGORIES[key] === category) || console.log(category)
  const name = defName.toLocaleUpperCase().replace(/[\s\-]/g, "_")



  return `${prefix}-${name}`
}