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
  httpOnly: false, // should be true to defend from XSS
  sameSite: false,
  secure
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())

app.get('/api', (req, res) => {
  res.cookie('lastEndpoint', 'api', cookieConfig)
  res.json({ server: 'up' })
})

app.get('/api/users', async (req, res) => {
  res.cookie('lastEndpoint', 'api-users', cookieConfig)
  const users = await db('users')
  res.json(users)
})

app.get('/api/roles', async (req, res) => {
  res.cookie('lastEndpoint', 'api-roles', cookieConfig)
  const roles = await db('roles')
  res.json(roles)
})

module.exports = app
