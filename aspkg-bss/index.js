//import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

onload = async function() {
    console.log('Running!')
    //sessionStorage.setItem('gh-token', '123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')
    const token = sessionStorage.getItem('gh-token')
    console.log("Token: ", token || 'uhh');
    //const octokit = new Octokit({ auth: token });
    const gh_username = document.getElementsByClassName("gh-username");

    //const user = await octokit.request("GET /user");

    for (let i = 0; i < gh_username.length; i++) {
        const elem = gh_username.item(i);
        //elem.innerHTML = `<img src="${user.data.avatar_url}" style="width: 30px;padding-right: 0px;border-radius: 100%;margin-right: 12px;">${user.data.name}`;
    }

}