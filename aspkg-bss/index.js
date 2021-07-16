import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

// I keep commenting out Octokit because I run offline most of the time...

onload = function launch() {
    console.log('Running Aspkg...')
    console.log('Pathname: ', location.pathname)
    if (location.pathname === '/') {
        runHome()
    } else if (location.pathname === '/package') {
        runPackage()
        runLogin()
    }
}

async function runLogin() {

    console.log(document.cookie)

    if (getCookie('token')) {
        console.log('Logged in.')
        const token = getCookie('token')
        console.log("Token: ", token);
        const octokit = new Octokit({ auth: token });
        const gh_username = document.getElementsByClassName("gh-username");

        const user = await octokit.request("GET /user");

        const account_nav = gh_username.item(0)

        account_nav.innerHTML = `<button class="btn btn-primary gh-avatar-btn" id="gh-avatar-btn" type="button" style="width: 40px;height: 40px;padding: 0px;padding-right: 0px;padding-left: 0px;border-radius: 100%;"><img src="assets/img/avatar.jpg" style="width: 40px;border-radius: 100%;padding-left: 0px;margin-left: -1px;margin-bottom: 0px;margin-top: -1px;padding-right: 0px;"></button>`;

        const gh_icon_btn = document.getElementById('gh-avatar-btn')

        // Want to make a drop-down with the following options:
        //             V (user icon)
        //            😎
        //  __________/\___
        // |Username     |
        // |Add a package|
        // |Settings     |
        // |Sign out     |
        // ---------------

        gh_icon_btn.onpointerenter = () => {
            // user_dash_dropdown.show()
        }
        gh_icon_btn.onpointerleave = () => {
            // user_dash_dropdown.hide()
            // ^psuedo-code
        }

        // Signout is easy. Just delete the `token` cookie and `location.reload()`

    } else {
        console.log('Not Logged In')
    }

}

async function runPackage() {

    const pkgData = await (await fetch(`/api-get${location.search}`)).json()

    const pkg = pkgData['package']

    const readme = pkgData['readme']

    console.log('Readme: ', readme)

    const pkgTitle = document.getElementById('pkg-title')

    const pkgVersion = document.getElementById('pkg-version')

    const pkgInstall = document.getElementById('pkg-install')

    const pkgGitHubLink = document.getElementById('pkg-github-link')

    const pkgDependencies = document.getElementById('pkg-dependencies')

    const pkgDevDependencies = document.getElementById('pkg-dev-dependencies')

    const pkgLicense = document.getElementById('pkg-license')

    const pkgReadme = document.getElementById('pkg-readme')

    pkgReadme.innerHTML = marked(readme)

    pkgTitle.innerText = pkg.name

    pkgVersion.innerText = `v${pkg.version}`

    if (pkg['aspkg']['type'] === "git") {
        pkgInstall.innerText = ` npm i ${pkg['repository']['url'].replace('git+', '').replace('https://', '').replace('github.com/', '').replace('.git', '').toLowerCase()} `
        pkgGitHubLink.innerText = `${pkg['repository']['url'].replace('git+', '').replace('https://', '').replace('github.com/', '').replace('.git', '').toLowerCase()}`
        pkgGitHubLink.setAttribute('href', pkg['repository']['url'].replace('git+', '').replace('.git', '').toLowerCase())
        pkgInstall.onclick = () => {
            navigator.clipboard.writeText(`npm i ${pkg['repository']['url'].replace('git+', '').replace('https://', '').replace('github.com/', '').replace('.git', '').toLowerCase()}`)
        }
    } else if (pkg['aspkg']['type'] === "npm") {
        pkgInstall.innerText = ` npm i ${pkg['name'].toLowerCase()} `
        if (pkg['repository'] && pkg['repository']['type'] === 'git') {
            pkgGitHubLink.innerText = `${pkg['repository']['url'].replace('git+', '').replace('https://', '').replace('github.com/', '').replace('.git', '').toLowerCase()}`
            pkgGitHubLink.setAttribute('href', pkg['repository']['url'].replace('git+', '').replace('.git', '').toLowerCase())
        } else {
            pkgGitHubLink.innerText = 'NPM'
            pkgGitHubLink.setAttribute('href', `https://npmjs.com/package${pkg['name']}/`.toLowerCase())
        }
        pkgInstall.onclick = () => {
            navigator.clipboard.writeText(`npm i ${pkg['name'].toLowerCase()}`)
        }
    }

    if (pkg['dependencies']) pkgDependencies.innerText = Object.keys(pkg['dependencies']).length || 0
    else pkgDependencies.innerText = 0

    if (pkg['devDependencies']) pkgDevDependencies.innerText = Object.keys(pkg['devDependencies']).length || 0
    else pkgDevDependencies.innerText = 0

    pkgLicense.innerText = pkg['license']

    const blocksJS = document.getElementsByClassName("language-js");

    for (let i = 0; i < blocksJS.length; i++) {
      let element = blocksJS.item(i);
      Rainbow.color(element.textContent, "javascript", (code) => {
        console.log("\nColored Code:\n", code);
        element.innerHTML = code;
      });
    }

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function decodeBase64(data) {
    return window.atob(data)
}