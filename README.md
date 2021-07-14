# AssemblyScript Packages Website

# Setting up
1. Install Bootstrap Studio (https://bootstrapstudio.io/)
2. DM/Issue me for a license key
3. Open up `AssemblyScript Packages.bsdesign` in BSS
4. Export (to the cloned folder)
5. Push

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