import { Command } from "commander"
import {
  generateColorDefinitions,
  generateColorSettings,
} from "./generators.js"

const program = new Command()

program
  .command("create-definitions")
  .option("-dev, --development", "Run in development mode")
  .action(options => {
    options.development && (process.env.NODE_ENV = 'development')
    generateColorDefinitions()
  })

program.parse()