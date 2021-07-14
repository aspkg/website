import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

onload = async function () {
    console.log('Running Aspkg...')

    if (getCookie('token')) {
        console.log('Logged in.')
        const token = getCookie('token')
        console.log("Token: ", token);
        const octokit = new Octokit({ auth: token });
        const gh_username = document.getElementsByClassName("gh-username");

        const user = await octokit.request("GET /user");

        for (let i = 0; i < gh_username.length; i++) {
            const elem = gh_username.item(i);
            elem.innerHTML = `<img src="${user.data.avatar_url}" style="width: 30px;padding-right: 0px;border-radius: 100%;margin-right: 12px;">${user.data.name}`;
        }
    } else {
        console.log('Not Logged In')
    }

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}