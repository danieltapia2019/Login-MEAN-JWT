require('./database')
const server = require('./app')

server.listen(server.get('port'))

console.log("Server on port ", server.get('port'))