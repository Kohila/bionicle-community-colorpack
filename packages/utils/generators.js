import fs from "fs"
import { XMLParser, XMLBuilder } from "fast-xml-parser"
const ROOT = process.cwd()

/**
 * @TODO finish writing function
 * This utility reads the CustomColorSettings.xml whose filepath is passed as an argument and exports each color block as
 * an individual JSON file.
 * @param {String}  filepath  The provided filepath to the CustomColorSettings.xml file.
 */

export const XmlToJsonFiles = () => {
  const INPUT_FILE = process.argv.slice(2)[0]
  const OUTPUT_DIR =
    process.env.NODE_ENV == "production" ? `` : `../.temp/XMLSplitter`

  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "self_",
    format: true,
    indentBy: "\t",
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
      "group_output",
    ],
  }

  const parser = new XMLParser(options)
  const builder = new XMLBuilder(options)

  fs.readFile(INPUT_FILE, (err, data) => {
    if (err) throw err
    const xml = parser.parse(data)
    for (material of xml.eyesight.material) {
      let color = new Object()
      color.material = material
      fs.writeFile(
        `${OUTPUT_DIR}/xml/${color.material.self_name}.xml`,
        builder.build(color),
        (err) => {
          if (err) throw err
        }
      )
    }
    fs.writeFile(
      `${PUTPUT_DIR}/json/XMLasJSON.json`,
      JSON.stringify(xml, null, 4),
      (err) => {
        if (err) throw err
      }
    )
    //log(builder.build(xml))
  })
}

/**
 * This function generates the ColorDefinitions.txt file as required by Stud.io
 */
export const generateColorDefinitions = () => {
  /**
   * @TODO This function must perform the following actions:
   * [x] Open a write stream to the build folder location in either development or
   *    production mode.
   * [x] Prime the write buffer with the appropriate headers
   * [ ] Page through the [colors/] directory for all color files and save filepaths to array
   * [ ] For each color file in array, write to the output buffer with the appropriate toTSV() function.
   */

  const buildPath = ROOT + (process.env.NODE_ENV === "dev" ? "/.temp/.build" : "/.build")
  const buildName = "CustomColorDefinition.txt"
  const definitionsColumns = `Studio Color Code\tBL Color Code\tLDraw Color Code\tLDD color code\tStudio Color Name\tBL Color Name\tLDraw Color Name\tLDD Color Name\tRGB value\tAlpha\tCategoryName\tColor Group Index\tnote\tIns_RGB\tIns_CMYK\tCategogy NickName\n`

  !fs.existsSync(buildPath) && fs.mkdirSync(buildPath, { recursive: true })
  const writeStrean = fs.createWriteStream(`${buildPath}/${buildName}`, {encoding: "utf-8"})
  writeStrean.write(definitionsColumns)
}