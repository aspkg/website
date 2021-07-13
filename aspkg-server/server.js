const { fastify } = require('fastify')
const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');
const fastifyServerSesion = require('fastify-server-session')
const axios = require('axios').default;
const { Octokit } = require('@octokit/core')
const fs = require('fs')
const path = require('path')
const kati = require('kati');
const ms = require('ms');
require('dotenv').config()

const app = fastify()

app.register(fastifyCookie, {
    secret: 'abcdefghijklmnopqrstuvwxyz1234567890',
    parseOptions: {}
});
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

    // TODO: Set access token in the sessionStorage as gh-token

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

    res.setCookie('token', token)

    const user = await octokit.request('GET /user')
    console.log('Username: ', user.data.name)
    console.log('Avatar: ', user.data.avatar_url)
    console.log('Url: ', user.data.url)

    res.send('Logged in.')
    // res.sessison.set('gh-token', token)

});