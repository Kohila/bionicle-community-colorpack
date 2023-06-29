/**
 * @TODO needs refactored. badly.
 * This utility reads the CustomColorDefinition.txt whose filepath is passed as an argument and exports each row of data as
 * an individual JSON file.
 * @param {String}  filepath  The provided filepath to the CustomColorDefinition.txt file.
 * 
 */

const fs = require('fs')

const OUTPUT_DIR = process.env == 'dev' ? `../.temp/TXTtoJSON` : `../colors`

const INPUT_FILE = process.argv.slice(2)[0]

const data = fs.readFileSync(INPUT_FILE, `utf8`).toString().split(/\r?\n/)


if(!fs.existsSync(OUTPUT_DIR)) { fs.mkdirSync(OUTPUT_DIR) }

const Color = {
  colorCodeStudio: null,
  colorCodeBricklink: null,
  colorCodeLDraw: null,
  colorCodeLDD: null,
  colorNameStudio: null,
  colorNameBricklink: null,
  colorNameLDraw: null,
  colorNameLDD: null,
  colorRGB: null,
  colorAlpha: null,
  categoryName: null,
  groupIndex: null,
  note: null,
  insRGB: null,
  insCMYK: null,
  categoryNickname: null
}

for (let i = 1; i < data.length; i++) {
  let color = Object.create(Color)
  let line = data[i].split("\t")
  color = {
  colorCodeStudio: line[0],
  colorCodeBricklink: line[1],
  colorCodeLDraw: line[2],
  colorCodeLDD: line[3],
  colorNameStudio: line[4],
  colorNameBricklink: line[5],
  colorNameLDraw: line[6],
  colorNameLDD: line[7],
  colorRGB: line[8],
  colorAlpha: line[9],
  categoryName: line[10],
  groupIndex: line[11],
  note: line[12],
  insRGB: line[13],
  insCMYK: line[14],
  categoryNickname: line[15]
  }

  let categoryDir = `${OUTPUT_DIR}/${color.categoryName}`
  if(!fs.existsSync(categoryDir)) { fs.mkdirSync(categoryDir) }

  let colorDir = `${OUTPUT_DIR}/${color.categoryName}/${color.categoryNickname}`
  if(!fs.existsSync(colorDir)) { fs.mkdirSync(colorDir) }

  fs.writeFileSync(`${colorDir}/${color.colorNameStudio}.json`, JSON.stringify(color, null, 4))
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