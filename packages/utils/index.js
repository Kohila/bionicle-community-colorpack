import { Command } from "commander"
import {
  generateColorDefinitions,
  generateObjectFromXML,
  generateXMLFromObject,
  generateYAMLFromObject
} from "./generators.js"

const program = new Command()

program
  .command("create-definitions")
  .option("-dev, --development", "Run in development mode")
  .action(options => {
    options.development && (process.env.NODE_ENV = 'development')
    generateColorDefinitions()
  })

program
  .command("xml-to-js")
  .action((options) => {
    generateObjectFromXML()
  })

program
  .command("js-to-xml")
  .action((options) => {
    generateXMLFromObject()
  })

  program
  .command("js-to-yaml")
  .action((options) => {
    generateYAMLFromObject()
  })

program.parse()