const colors = require('colors')

const CLIversion = require('./package.json').version

const path = require('path')

const got = require('got').default

const fs = require('fs')

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
        console.log('No \'aspkg\' field found in package.json.\n{ "type": "git/npm", "platforms": [] }')
    }
    got.post('http://localhost:3000/api-publish', {
        json: {
            package: pkg,
            readme: fs.readFileSync(path.join(process.cwd(), '/README.md')).toString()
        },
        responseType: 'text'
    })
}

if (commands.length == 0 && flags.length == 0) {
    console.log('📦 Aspkg CLI 📦')
    console.log(`v${CLIversion}`)
    console.log('Usage: aspkg [command] [flags]')
    console.log('-------')
    console.log('Publish a package:')
    console.log(' - aspkg publish\n')
    console.log('Update a package')
    console.log(' - aspkg update\n')
    console.log('Login to aspkg')
    console.log(' - aspkg login')
    console.log('Logout of aspkg')
    console.log(' - aspkg logout')
    kill()
}