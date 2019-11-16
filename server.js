const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./database/dbConfig')
const { secure, origin, domain } = require('./config/index')

const app = express()

var corsOptions = {
  origin, // array of admissible origins
  credentials: true,
}

const cookieConfig = {
  maxAge: 900000,
  httpOnly: false, // if the frontend js needs access to cookie
  sameSite: 'None',
  secure,
  domain,
}

const lastEndpointUsed = (last) => (_, res, next) => {
  res.cookie('lastEndpoint', last, cookieConfig)
  next()
}

app.use(helmet())
app.use(express.json())
app.use(cors(corsOptions))

app.get('/api', lastEndpointUsed('api'), (_, res) => {
  res.json({ server: 'up' })
})

app.get('/api/users', lastEndpointUsed('api-users'), async (_, res) => {
  const users = await db('users')
  res.json(users)
})

app.get('/api/roles', lastEndpointUsed('api-roles'), async (_, res) => {
  const roles = await db('roles')
  res.json(roles)
})

module.exports = app
