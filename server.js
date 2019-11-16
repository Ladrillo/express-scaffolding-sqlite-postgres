const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./database/dbConfig')
const origin = require('./config/index').origin
const secure = require('./config/index').secureCookie
const app = express()

var corsOptions = {
  origin,
  credentials: true,
}

const cookieConfig = {
  maxAge: 900000,
  httpOnly: false, // should be true to defend against XSS
  sameSite: 'None',
  secure
}

const lastEndpointUsed = last => (_, res, next) => {
  res.cookie('lastEndpoint', last, cookieConfig)
  next()
}

app.use(express.json())
app.use(cors(corsOptions))
// app.use(helmet())

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
