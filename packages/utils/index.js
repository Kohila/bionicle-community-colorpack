import { Command } from "commander"
import {
  generateColorDefinitions,
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

program
  .command("ramp")
  .argument(
    "<r,g,b>",
    "The primary color of the ramp in RGB format, comma-delimited. RGB values should be from 0-255 inclusive."
  )
  .arguments(
    "<r,g,b>",
    "The secondary color of the ramp in RGB format, comma-delimited. RGB values should be from 0-255 inclusive."
  )
  .action((firstRGB, secondRGB) => {
    try {
      // Check if arguments were passed
      if (typeof firstRGB == "undefined")
        throw "[ERROR]: First <r,g,b> argument not specified."
      if (typeof secondRGB == "undefined")
        throw "[ERROR]: Second <r,g,b> argument not specified."

      // Validating first RGB
      const first = firstRGB.split(",")
      if (first.length != 3)  throw `[ERROR]: First <r,g,b> argument <${firstRGB}> is in an invalid format.`
      first.forEach((value) => {
        if (isNaN(value) || value < 0 || value > 255) throw `[ERROR]: The first <r,g,b> argument <${firstRGB}> contains an invalid value: ${value}.`
      })

      // Validating second RGB
      const second = secondRGB.split(",")
      if (second.length != 3) throw `[ERROR]: Second <r,g,b> value <${secondRGB}> is in an invalid format.`
      second.forEach((value) => {
        if (isNaN(value) || value < 0 || value > 255) throw `[ERROR]: The second <r,g,b> argument <${secondRGB}> contains an invalid value: ${value}.`
      })
    } catch (err) {
      console.error(err)
    }
  })

program.parse()
