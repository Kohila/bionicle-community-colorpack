const readline = require('readline')
const patcher = require('./src/patcher.js')

//patcher()

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

askQuestion(process.argv.toString())