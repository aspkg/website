# AssemblyScript Packages Website

# Running the website

First install dependencies:

```sh
cd aspkg-bss
npm install
cd ../aspkg-server
npm install
```

In one terminal run the backend:

```sh
cd aspkg-server
node server
```

In another terminal build the frontend:

```sh
cd aspkg-bss
npm run dev
```

Now open http://localhost:3000 in your browser.

# Gateways

`/` Main Page
`/package.html` Package example
`/404.html` 404 error
`/login` GitHub login redirect
`/search?query=` Package search page

# API

`GET /api-login` GitHub API OAuth verification
`GET /api-logout` Log the user out
`GET /api-search?query=` Search for package results (JSON)
`POST /api-publish` Publish a package
`POST /api-update` Update a package (Without a new version)
`POST /api-remove` Remove a package

# Pages-to-make

- Login
- Logout
- Profile
- Admin
- Help

# Todo

- Add rate limiting
- Convert scripting to AssemblyScript
