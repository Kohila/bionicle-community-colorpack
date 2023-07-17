import * as build from "./build.js"
import * as logger from "./loggers.js"

if (process.argv[2] === "createBuild") build.createBuild()
if (process.argv[2] === "colorAttributesNeeded") logger.colorAttributesNeeded()