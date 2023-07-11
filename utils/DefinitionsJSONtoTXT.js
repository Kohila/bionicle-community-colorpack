/**
 * @TODO needs refactored pls
 * This utility reads a collection of JSON files and exports them in a single CustomColorDefinition.txt file.
 */

import fs from 'fs'
import { getDirectoryContents } from "./common"

const OUTPUT_DIR = process.env.NODE_ENV == 'production' ? `./.build` : `./.temp/JSONtoTXT`
const INPUT_DIR = process.env.NODE_ENV == 'production' ? `./colors` : `./.temp/TXTtoJSON`
const OUTPUT_FILE = `${OUTPUT_DIR}/CustomColorDefinition.txt`

const headers = `Studio Color Code	BL Color Code	LDraw Color Code	LDD color code	Studio Color Name	BL Color Name	LDraw Color Name	LDD Color Name	RGB value	Alpha	CategoryName	Color Group Index	note	Ins_RGB	Ins_CMYK	Categogy NickName\n`
const fileList = getFileList(INPUT_DIR)

if(!fs.existsSync(OUTPUT_DIR)) { fs.mkdirSync(OUTPUT_DIR) }

fs.writeFileSync(OUTPUT_FILE, headers)

for(const file of fileList) {
  if (file.split('.').pop() != 'json') continue
  let color = fs.readFileSync(file)
  color = JSON.parse(color)
  const definition =  `${color.colorCodeStudio}	${color.colorCodeBricklink}	${color.colorCodeLDraw}	${color.colorCodeLDD}	${color.colorNameStudio}	${color.colorNameBricklink}	${color.colorNameLDraw}	${color.colorNameLDD}	${color.colorRGB}	${color.colorAlpha}	${color.categoryName}	${color.groupIndex}	${color.note}	${color.insRGB}	${color.insCMYK}	${color.categoryNickname}\n`
  fs.appendFileSync(OUTPUT_FILE, definition)
}

function getFileList(dir) {
  let files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const item of items) {
    if (item.isDirectory()) {
      files = [
        ...files,
        ...(getFileList(`${dir}/${item.name}`)),
      ];
    } else {
      files.push(`${dir}/${item.name}`)
    }
  }

  return files
}