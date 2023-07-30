/** @module generators */

import fs from "fs"
import path from "path"
import { getColorObjects, root } from "./common.js"
import { JSONtoTSV, XMLtoJSON, JSONtoXML, JSONtoYAML, parseRGBPercentage } from "./converters.js"
import { debug } from "./common.js"

/**
 * This function generates the ColorDefinitions.txt file as required by Stud.io.
 * This generator performs the following actions:
 * - Opens a write stream to the build folder location in either development or
 *    production mode.
 * - Primes the write buffer with the appropriate TSV headers.
 * - Pages through the [colors/] directory for all color files and saves the filepaths to an array.
 * - For each color file in array, writes to the output buffer with the appropriate toTSV() function.
 */
export const generateColorDefinitions = async () => {
  const buildPath = path.join(
    root,
    process.env.NODE_ENV === "development" ? "/.temp/.build" : "/.build"
  )
  const outputPath = path.join(buildPath, "CustomColorDefinition.txt")
  const definitionsColumns = `Studio Color Code\tBL Color Code\tLDraw Color Code\tLDD color code\tStudio Color Name\tBL Color Name\tLDraw Color Name\tLDD Color Name\tRGB value\tAlpha\tCategoryName\tColor Group Index\tnote\tIns_RGB\tIns_CMYK\tCategogy NickName\n`

  !fs.existsSync(buildPath) && fs.mkdirSync(buildPath, { recursive: true })

  const writeStream = fs.createWriteStream(outputPath, { encoding: "utf-8" })
  writeStream.write(definitionsColumns)

  const colors = await getColorObjects()

  for (const color of colors) {
    console.log(color)
    writeStream.write(JSONtoTSV(color) + "\n")
  }
}

/**
 * @TODO Write script.
 *
 * This function generates the ColorSettings.xml file as required by Stud.io.
 */
export const generateColorSettings = () => {}

/**
 * @typedef {Object} RGB
 * @property {number} r The red value of a color on a scale of 0-255.
 * @property {number} g The green value of a color on a scale of 0-255.
 * @property {number} b The blue value of a color on a scale of 0-255.
 */
/**
 * This function generates color ramp data from provided RGB values. Original algorithm created
 * by Unpixelled.
 * @param {RGB} first The RGB values of the first color as a JS object.
 * @param {RGB} second The RGB values of the second color as a JS object.
 * @param {number} start The start point of the gradient in the ramp values. From 0-100. Default: 0.
 * @param {number} end The end point of the gradient in the ramp values. From 0-100. Default: 100.
 * @returns {string} The calculated color ramp data.
 */
export const generateColorRamp = ({ first, second }, start = 0, end = 100) => {
  const RAMP_CYCLES = 256

  const percentages = {
    start: start - 0,
    gradient: end - start,
    end: 100 - end,
  }

  const cycles = {
    start: Math.round((percentages.start / 100) * RAMP_CYCLES),
    gradient: Math.round((percentages.gradient / 100) * RAMP_CYCLES),
    end: Math.round((percentages.end / 100) * RAMP_CYCLES),
  }

  console.dir(cycles)

  const difference = {
    r: (parseRGBPercentage(second.r - first.r) / cycles.gradient),
    g: (parseRGBPercentage(second.g - first.g) / cycles.gradient),
    b: (parseRGBPercentage(second.b - first.b) / cycles.gradient),
  }

  debug(`Differences: ${difference.r * cycles.gradient} ${difference.g * cycles.gradient} ${difference.b * cycles.gradient}\n`)

  const rampValues = new Array()

  for (let i = 0; i < RAMP_CYCLES; i++) {
    if (i <= cycles.start) {
      rampValues.push(parseRGBPercentage(first.r))
      rampValues.push(parseRGBPercentage(first.g))
      rampValues.push(parseRGBPercentage(first.b))
    } else if (cycles.start < i && i < (cycles.start + cycles.gradient - 1)) {
      rampValues.push(parseRGBPercentage(first.r) + (difference.r * (i - cycles.start)))
      rampValues.push(parseRGBPercentage(first.g) + (difference.g * (i - cycles.start)))
      rampValues.push(parseRGBPercentage(first.b) + (difference.b * (i - cycles.start)))
    } else if (i >= cycles.end) {
      rampValues.push(parseRGBPercentage(second.r))
      rampValues.push(parseRGBPercentage(second.g))
      rampValues.push(parseRGBPercentage(second.b))
    }
  }
  debug(rampValues.join(" "))
  return rampValues.join(" ")
}

/**
 * This function reads color data from an XML file, converts the data to JSON format, and generates a
 * corresponding JSON file.
 */
export const generateObjectFromXML = async () => {
  const filePath = path.join(root, ".temp", "setting.xml")
  const outputPath = path.join(root, ".temp", "setting.json")

  const file = fs.readFileSync(filePath)
  const js = await XMLtoJSON(file.toString())

  fs.writeFileSync(outputPath, JSON.stringify(js, null, 2))
}

/**
 * This function reads color data from a JSON file, converts the data to XML format, and generates a
 * corresponding XML file.
 */
export const generateXMLFromObject = async () => {
  const filePath = path.join(root, ".temp", "setting.json")
  const outputPath = path.join(root, ".temp", "setting2.xml")

  const file = fs.readFileSync(filePath)
  const xml = await JSONtoXML(JSON.parse(file))

  fs.writeFileSync(outputPath, xml)
}

/**
 * This function reads color data from a JSON file, converts the data to YAML format, and generates a
 * corresponding YAML file.
 */
export const generateYAMLFromObject = () => {
  const filePath = path.join(root, ".temp", "setting.json")
  const outputPath = path.join(root, ".temp", "setting.yaml")

  const file = fs.readFileSync(filePath)
  const yaml = JSONtoYAML(JSON.parse(file))

  fs.writeFileSync(outputPath, yaml)
}

/**
 * @TODO finish writing function
 * This utility reads the CustomColorSettings.xml whose filepath is passed as an argument and exports each color block as
 * an individual JSON file.
 * @param {String} filepath The provided filepath to the CustomColorSettings.xml file.
 */
// export const XmlToJsonFiles = () => {
//   const INPUT_FILE = process.argv.slice(2)[0]
//   const OUTPUT_DIR =
//     process.env.NODE_ENV == "production" ? `` : `../.temp/XMLSplitter`

//   const options = {
//     ignoreAttributes: false,
//     attributeNamePrefix: "self_",
//     format: true,
//     indentBy: "\t",
//     preserverOrder: true,
//     allowBooleanAttributes: true,
//     suppressUnpairedNode: false,
//     unpairedTags: [
//       "add_closure",
//       "input",
//       "output",
//       "vector",
//       "vector_transform",
//       "connect",
//       "group_input",
//       "group_output",
//     ],
//   }

//   const parser = new XMLParser(options)
//   const builder = new XMLBuilder(options)

//   fs.readFile(INPUT_FILE, (err, data) => {
//     if (err) throw err
//     const xml = parser.parse(data)
//     for (material of xml.eyesight.material) {
//       let color = new Object()
//       color.material = material
//       fs.writeFile(
//         `${OUTPUT_DIR}/xml/${color.material.self_name}.xml`,
//         builder.build(color),
//         (err) => {
//           if (err) throw err
//         }
//       )
//     }
//     fs.writeFile(
//       `${PUTPUT_DIR}/json/XMLasJSON.json`,
//       JSON.stringify(xml, null, 4),
//       (err) => {
//         if (err) throw err
//       }
//     )
//     //log(builder.build(xml))
//   })
// }
