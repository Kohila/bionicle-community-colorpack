const readline = require('readline')
const patcher = require('./src/patcher.js')

/**
 * The patcher should have three behaviors:
 * a) User launches EXE, and the patcher executes on all .IO files within the EXE's parent directory
 * b) User drag-and-drops (a) .IO file(s) onto the EXE, and the patcher executes on the dropped .IO file(s)
 * c) User launches EXE from cmd/terminal and can take optional arguments.
 *    -if argument == directory path, patcher executes on all .IO files within that directory
 *    -if arguments == space delimited list of filepaths, patcher executes on all passed .IO files
 *    -if no arguments supplied, patcher executes on all .IO files within the EXE's parent directory
 */

const askQuestion = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  return new Promise(resolve => rl.question(query, ans => {
    rl.close()
    resolve(ans)
  }))
}

console.log(__filename)
console.log(__dirname)

process.argv.forEach(item => {
  console.log(item.toString())
})

askQuestion("TEST")