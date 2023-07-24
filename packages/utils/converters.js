import fs from "fs"
import xml2js from "xml2js"
import flatten from "flat"
import { getDirectoryContents } from "./common.js"

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

/**
 * Converts a JSON object to an XML string
 * @param {object} object The JSON object to convert
 * @return {string} The XML root element output as a string
 */
export const JSONtoXML = (object) => {
  const xmlBuilder = new xml2js.Builder({
    headless: true,
  })
  const xml = xmlBuilder.buildObject(object)
  return xml
}

/**
 * Converts a JSON object into a TSV row based on columns defined in TSV_ROWS
 * @param {Object} object The JSON object to convert
 * @return {string} The TSV row output as a string
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
 *
 * @param {string} element The XML root element to convert
 * @return {string} The TSV row output as a string
 */
export const XMLtoTSV = (element) => {}

/**
 * @deprecated Function is in the process of being refactored
 * @todo split into discreet conversion and generation logic
 */
export const JsonToTxt = () => {
  const OUTPUT_DIR =
    process.env.NODE_ENV == "production" ? `./.build` : `./.temp/JSONtoTXT`
  const INPUT_DIR =
    process.env.NODE_ENV == "production" ? `./colors` : `./.temp/TXTtoJSON`
  const OUTPUT_FILE = `${OUTPUT_DIR}/CustomColorDefinition.txt`

  const headers = `Studio Color Code	BL Color Code	LDraw Color Code	LDD color code	Studio Color Name	BL Color Name	LDraw Color Name	LDD Color Name	RGB value	Alpha	CategoryName	Color Group Index	note	Ins_RGB	Ins_CMYK	Categogy NickName\n`
  const fileList = getFileList(INPUT_DIR)

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }

  fs.writeFileSync(OUTPUT_FILE, headers)

  for (const file of fileList) {
    if (file.split(".").pop() != "json") continue
    let color = fs.readFileSync(file)
    color = JSON.parse(color)
    const definition = `${color.colorCodeStudio}	${color.colorCodeBricklink}	${color.colorCodeLDraw}	${color.colorCodeLDD}	${color.colorNameStudio}	${color.colorNameBricklink}	${color.colorNameLDraw}	${color.colorNameLDD}	${color.colorRGB}	${color.colorAlpha}	${color.categoryName}	${color.groupIndex}	${color.note}	${color.insRGB}	${color.insCMYK}	${color.categoryNickname}\n`
    fs.appendFileSync(OUTPUT_FILE, definition)
  }

  function getFileList(dir) {
    let files = []
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
      if (item.isDirectory()) {
        files = [...files, ...getFileList(`${dir}/${item.name}`)]
      } else {
        files.push(`${dir}/${item.name}`)
      }
    }

    return files
  }
}

/**
 * @deprecated Function is in the process of being refactored
 * @todo split into discreet conversion and generation logic
 */
export const TxtToJson = () => {
  const OUTPUT_DIR = "./colors"
  //const OUTPUT_DIR = process.env.NODE_ENV == 'production' ? `./colors` : `./.temp/TXTtoJSON`
  const INPUT_FILE = process.argv.slice(2)[0]

  function Color(attributes) {
    this.colorCodeStudio = attributes[0]
    this.colorCodeBricklink = attributes[1]
    this.colorCodeLDraw = attributes[2]
    this.colorCodeLDD = attributes[3]
    this.colorNameStudio = attributes[4]
    this.colorNameBricklink = attributes[5]
    this.colorNameLDraw = attributes[6]
    this.colorNameLDD = attributes[7]
    this.colorRGB = attributes[8]
    this.colorAlpha = attributes[9]
    this.categoryName = attributes[10]
    this.groupIndex = attributes[11]
    this.note = attributes[12]
    this.insRGB = attributes[13]
    this.insCMYK = attributes[14]
    this.categoryNickname = attributes[15]
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }

  const data = fs.readFileSync(INPUT_FILE, `utf8`).toString().split(/\r?\n/)

  for (let i = 1; i < data.length; i++) {
    const attributes = data[i].split("\t")
    if (attributes.every((element) => element === "")) {
      continue
    }
    const COLOR_DEF = new Color(attributes)
    const COLOR_DIR =
      `${OUTPUT_DIR}/${COLOR_DEF.categoryName}` +
      (COLOR_DEF.categoryNickname?.length > 0
        ? `/${COLOR_DEF.categoryNickname}`
        : ``)

    /** Checks if folder locations exist and, if they do not, creates them */
    if (!fs.existsSync(`${OUTPUT_DIR}/${COLOR_DEF.categoryName}`)) {
      fs.mkdirSync(`${OUTPUT_DIR}/${COLOR_DEF.categoryName}`)
    }
    if (!fs.existsSync(COLOR_DIR)) {
      fs.mkdirSync(COLOR_DIR)
    }

    fs.writeFileSync(
      `${COLOR_DIR}/${COLOR_DEF.colorNameStudio}.json`,
      JSON.stringify(COLOR_DEF, null, 4)
    )
  }

  //log(definitions[0])

  /*fs.readFile(args[0], (err, data) => {
  if (err) throw err

  let definitions = data

  definitions.split(`\n`)

  log(definitions)
  
  fs.writeFile('./textOutput.xml', output.toString(), (err) => {
    if (err) throw err
  })
  //log(builder.build(xml))
})*/
}
