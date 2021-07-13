const colors = require('colors')

const CLIversion = require('./package.json').version

const path = require('path')

const pkg = require(path.join(process.cwd(), '/package.json'))

const args = process.argv.slice(2, process.argv.length)

let flags = args.join('').replace(/\--/g, '-').split('-')

flags.shift()

let commands = []

for (const arg of args) {
    if (arg[0] != '-') {
        commands.push(arg)
    }
}

function kill() {
    process.exit(0)
}
// Flags

if (flags.includes('v') || flags.includes('version')) {
    console.log(`v${CLIversion}`)
    kill()
}

// Commands

if (commands.includes('publish')) {
    console.log(pkg)
    if (!pkg['aspkg']) {
        console.log('No \'aspkg\' field found in package.json.\n{ "type": "git/npm", "platforms": ["NodeJS", "Browser", "WASM", "Lunatic", "Wasmtime", "Wasm3"]')
    }
}

if (commands.length == 0 && flags.length == 0) {
    console.log('📦 Aspkg CLI 📦')
    console.log(`v${CLIversion}`)
    console.log('Usage: aspkg [command] [flags]')
    console.log('-------')
    console.log('Publish a package:')
    console.log('\taspkg publish')
    kill()
}