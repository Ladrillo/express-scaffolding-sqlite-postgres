require('dotenv').config()

const server = require('./server')
const port = process.env.PORT || 4400


server.listen(port, () => {
  console.log('listening on ' + port)
})
