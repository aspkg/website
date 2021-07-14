import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

// I keep commenting out Octokit because I run offline most of the time...

onload = async function () {
    console.log('Running Aspkg...')

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

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}