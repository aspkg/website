import { Octokit } from 'https://cdn.skypack.dev/@octokit/core'

import { Asdom } from './node_modules/asdom/glue/index.js'
import { ECMAssembly } from './node_modules/ecmassembly/index.js'
import { instantiate } from './node_modules/@assemblyscript/loader/index.js'

main()

const isDev = !location.host.includes('aspkg.dev')
const host = isDev ? location.host : 'localhost:3000'

async function main() {
	await startASModule()
	await authAndDomStuffCoupledTogether()

	console.log('Running Aspkg...')
	console.log('Pathname: ', location.pathname)

	/*if (location.pathname === '/') {
		runLogin()
	} else if (location.pathname === '/') {
		runPackage()
		runLogin()
	}*/
	runPackage()
}

/**
 * This function does one thing and does it well: starts the AssemblyScript module.
 */
async function startASModule() {
	// Create an Asdom instance that has the glue code for DOM APIs.
	const asdom = new Asdom()

	// Create an ECMAssembly instance that has glue code for requestAnimationFrame.
	const ecmassembly = new ECMAssembly()

	const { exports } = await instantiate(fetch('./build/untouched.wasm'), {
		// Pass the glue code wasmImports in.
		...asdom.wasmImports,
		...ecmassembly.wasmImports,

		// ...Add any other imports your apps needs as usual...
	})

	// Before you do anything, pass the the Wasm module's exports to the glue code instances.
	asdom.wasmExports = exports
	ecmassembly.wasmExports = exports

	// Now execute the Wasm module. Make the Wasm module was compiled with `--explicitStart`.
	exports._start()
}

/**
 * TODO, databse auth stuff should ideally not be intertwined with DOM rendering like it currently is here in this function.
 */
async function authAndDomStuffCoupledTogether() {
	if (getCookie('token')) {
		console.log('Logged in.')
		const token = getCookie('token')
		console.log('Token: ', token)
		const octokit = new Octokit({ auth: token })
		const gh_avatar_icon = document.getElementById('gh-avatar-icon')

		const user = await octokit.request('GET /user')

		const userAvatar = user.data.avatar_url

		const userName = user.data.name

		gh_avatar_icon.innerHTML = `<img src="${userAvatar}" style="width: 30px;border-radius: 100%;margin-left: 10px;margin-left: -1px;margin-bottom: 0px;margin-top: -1px;padding-right: 0px;">`

		// Want to make a drop-down with the following options:
		//             V (user icon)
		//            😎
		//  __________/\___
		// |Username     |
		// |Add a package|
		// |Settings     |
		// |Sign out     |
		// ---------------

		// Signout is easy. Just delete the `token` cookie and `location.reload()`
	} else {
		console.log('Not Logged In')
	}
}

async function runPackage() {
	const pkg = await (await fetch(`http://localhost:3000/api-get${location.search}`)).json()

	const gh_owner = pkg['repository']['url']
		.replace('git+', '')
		.replace('https://', '')
		.replace('github.com', '')
		.replace('.git', '')
		.toLowerCase()
		.split('/')[1]

	const gh_repo = pkg['repository']['url']
		.replace('git+', '')
		.replace('https://', '')
		.replace('github.com', '')
		.replace('.git', '')
		.toLowerCase()
		.split('/')[2]

	const token = getCookie('token')

	const octokit = new Octokit({ auth: token })

	const currentUser = await octokit.request('GET /user')

	console.log(`https://api.github.com/users/${gh_owner}`)
	const packageAuthor = await (
		await fetch(`https://api.github.com/users/${gh_owner}`, {
			method: 'GET',
		})
	).json()

	const userAvatar = currentUser.data.avatar_url

	const userName = currentUser.data.name

	const authorAvatar = packageAuthor.avatar_url

	const authorName = packageAuthor.name

	const ghAuthor = document.getElementById('gh-author')

	ghAuthor.innerHTML = `<img src="${authorAvatar}" style="width: 30px; border-radius: 57px; margin-right: 8px" />${authorName}`

	const readme = await (await fetch(`https://raw.githubusercontent.com/${gh_owner}/${gh_repo}/master/README.md`)).text()

	const pkgTitle = document.getElementById('pkg-title')

	const pkgVersion = document.getElementById('pkg-version')

	const pkgInstall = document.getElementById('pkg-install')

	const pkgGitHubLink = document.getElementById('pkg-github-link')

	const pkgDependencies = document.getElementById('pkg-dependencies')

	const pkgDevDependencies = document.getElementById('pkg-dev-dependencies')

	const pkgIssues = document.getElementById('pkg-issues')

	const pkgLicense = document.getElementById('pkg-license')

	const pkgReadme = document.getElementById('pkg-readme')

	pkgReadme.innerHTML = marked(readme)

	pkgTitle.innerText = pkg['name']

	pkgVersion.innerText = `v${pkg.version}`

	const issuesData = await (await fetch('https://api.github.com/repos/aspkg/as-json/issues')).json()

	pkgIssues.innerText = Object.keys(issuesData).length

	pkgIssues.setAttribute(
		'href',
		`${pkg['repository']['url'].replace('git+', '').replace('.git', '').toLowerCase()}/issues`
	)

	pkgIssues.setAttribute('href', `https://github.com/${gh_owner}/${gh_repo}/issues`)

	pkgGitHubLink.setAttribute('href', `https://github.com/${gh_owner}/${gh_repo}/`)

	pkgGitHubLink.innerText = `${gh_owner}/${gh_repo}`

	pkgInstall.innerText = `npm i ${gh_owner}/${gh_repo}`

	pkgInstall.onclick = () => {
		pkgInstall.innerText = `Copied!`
		navigator.clipboard.writeText(`npm i ${gh_owner}/${gh_repo}`)
		// Copy to clipboard
		setTimeout(() => {
			pkgInstall.innerText = `npm i ${gh_owner}/${gh_repo}`
		}, 500)
	}

	if (pkg['dependencies']) pkgDependencies.innerText = Object.keys(pkg['dependencies']).length || 0
	else pkgDependencies.innerText = 0

	if (pkg['devDependencies']) pkgDevDependencies.innerText = Object.keys(pkg['devDependencies']).length || 0
	else pkgDevDependencies.innerText = 0

	pkgLicense.innerText = pkg['license']

	const blocksJS = document.getElementsByClassName('language-js')

	for (let i = 0; i < blocksJS.length; i++) {
		let element = blocksJS.item(i)
		Rainbow.color(element.textContent, 'javascript', (code) => {
			console.log('\nColored Code:\n', code)
			element.innerHTML = code
		})
	}
}

function getCookie(name) {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop().split(';').shift()
}

function decodeBase64(data) {
	return window.atob(data)
}
