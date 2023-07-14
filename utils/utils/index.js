export * from "./build.js"
export * from "./common.js"
export * from "./converters.js"
export * from "./generators.js"

import * as build from './build.js'

switch (process.argv[2]) {
  case 'createBuild':
    build.createBuild()
    break
  default:
    break
}