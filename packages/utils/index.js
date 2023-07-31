import { Command } from "commander"
import { debug } from "./common.js"
import {
  generateColorDefinitions,
  generateColorRamp,
  generateMergedColor,
  generateObjectFromTSV,
  generateObjectFromXML,
  generateXMLFromObject,
  generateYAMLFromObject,
} from "./generators.js"

const program = new Command()

program
  .command("create-definitions")
  .option("-dev, --development", "Run in development mode")
  .action((options) => {
    options.development && (process.env.NODE_ENV = "development")
    generateColorDefinitions()
  })

program.command("xml-to-js").action((options) => {
  generateObjectFromXML()
})

program.command("js-to-xml").action((options) => {
  generateXMLFromObject()
})

program.command("js-to-yaml").action((options) => {
  generateYAMLFromObject()
})

program.command("tsv-to-js").action((options) => {
  generateObjectFromTSV()
})

program.command("merge-color-files").action((options) => {
  generateMergedColor()
})

program
  .command("ramp")
  .argument(
    "<r1,g1,b1>",
    "The primary color of the ramp in RGB format, comma-delimited. RGB values should be from 0-255 inclusive."
  )
  .arguments(
    "<r2,g2,b2>",
    "The secondary color of the ramp in RGB format, comma-delimited. RGB values should be from 0-255 inclusive."
  )
  .option("-dev, --development", "Run in development mode")
  .option("-s, --start <number>", "The starting point for the gradient. Value should be from 0-100. (Default: 0)", parseInt)
  .option("-e, --end <number>", "The ending point for the gradient. Value should be from 0-100. (Default: 100)", parseInt)
  .action((firstRGB, secondRGB, options) => {
    options.development && (process.env.NODE_ENV = "development")
    
    const colors = {
      first: validateRGBInput(firstRGB),
      second: validateRGBInput(secondRGB)
    }
    
    const start = parseInt(options.start) || 0
    const end = parseInt(options.end) || 100

    colors.first && colors.second && generateColorRamp(colors, start, end)
  })

const validateRGBInput = (input) => {
  try {
    const array = input.split(",").map((e) => parseInt(e))
    if (array.length != 3)
      throw `[ERROR]: The <r,g,b> argument <${input}> is in an invalid format.`
    array.forEach((value) => {
      if (isNaN(value) || value < 0 || value > 255)
        throw `[ERROR]: The <r,g,b> argument <${input}> contains an invalid value: ${value}.`
    })

    const color = {
      r: array[0],
      g: array[1],
      b: array[2],
    }
    return color
  } catch (err) {
    console.error(err)
    return false
  }
}

program.parse()
