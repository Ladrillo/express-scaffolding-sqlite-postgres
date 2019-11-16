const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./database/dbConfig')
const origin = require('./config/index').origin
const app = express()

var corsOptions = {
  origin
}

app.use(express.json())
app.use(cors(corsOptions))
app.use(helmet())

app.get('/api', (req, res) => {
  res.cookie('lastEndpoint', '/', { maxAge: 900000, httpOnly: false })
  res.json({ server: 'up' })
})

app.get('/api/users', async (req, res) => {
  res.cookie('lastEndpoint', '/users', { maxAge: 900000, httpOnly: false })
  const users = await db('users')
  res.json(users)
})

app.get('/api/roles', async (req, res) => {
  res.cookie('lastEndpoint', '/roles', { maxAge: 900000, httpOnly: false })
  const roles = await db('roles')
  res.json(roles)
})

module.exports = app
