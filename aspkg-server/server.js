const { fastify } = require('fastify')
const axios = require('axios').default;
const { Octokit } = require('@octokit/core')
const fs = require('fs')
const path = require('path')
const kati = require('kati')
const app = fastify()
require('dotenv').config()
const clientId = process.env.id;
const clientSecret = process.env.secret;
let octokit
let token

app.listen(3000)
// Static file serve
app.register(require('fastify-static'), {
    root: path.join(__dirname, '../aspkg-bss'),
})

// Package Searching
app.get('/search', (req, res) => {
    const query = req.query['query']
    if (!query) {
        // Send an empty list of results
        res.send(JSON.stringify({}))
        return
    }
})

app.get('/login', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
});

app.get('/get-token', async (req, res) => {
    res.send(token)
})

app.get('/login-success', async (req, res) => {

    if (token == null) {
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            code: req.query.code
        };

        const opts = { headers: { accept: 'application/json' } };

        token = (await axios.post(`https://github.com/login/oauth/access_token`, body, opts)).data.access_token
        console.log('Token: ', token)
        octokit = new Octokit({ auth: token })
    }

    const user = await octokit.request('GET /user')
    console.log('Username: ', user.data.name)
    console.log('Avatar: ', user.data.avatar_url)
    console.log('Url: ', user.data.url)
    res.send(`Logged in as ${user.data.name}`)

    res.redirect(200, '/')

});