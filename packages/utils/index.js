import * as build from "./build.js"
import * as convert from "./converters.js"
import * as generate from "./generators.js"
import * as logger from "./loggers.js"
import { color } from "../../documentation/sample_color.js"

const command = process.argv[2]

command === "createBuild" && build.createBuild()
command === "colorAttributesNeeded" && logger.colorAttributesNeeded()
command === "JSONtoXML" && console.log(convert.JSONtoXML(color.json))
command === "JSONtoTSV" && console.log(convert.JSONtoTSV(color))
command === "generateColorDefinitions" && generate.generateColorDefinitions()