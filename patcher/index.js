const readline = require('readline')
const patcher = require('./src/patcher.js')

//patcher()

console.log("TEST")

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