const exe = require("@angablue/exe")
const version = require("./package.json").version

const build = exe({
  entry: "./index.js",
  out: `./.build/patcher-${version}.exe`,
  pkg: ["-C", "Brotli"],
  icon: "./assets/icon.ico",
  version,
  target: "node18-win-x64",
  properties: {
    FileDescription: "BIONICLE Community Colorpack Stud.io File Patcher",
    ProductName: "BIONICLE Community Colorpack Stud.io File Patcher",
    OriginalFilename: `patcher-${version}.exe`,
  },
})

build.then(() => console.log("Build complete!"))