const { fastify } = require('fastify')

// Create server
const app = fastify()

// Set cookie handler
app.register(require('fastify-static'), {
    root: __dirname,
	prefix: '/'
})

app.listen(5000)

console.log('http://localhost:5000/')