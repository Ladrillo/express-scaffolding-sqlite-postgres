const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const db = require('./database/dbConfig')
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/api', (req, res) => {
  res.json({ server: 'up' })
})

app.get('/api/users', async (req, res) => {
  const users = await db('users')
  res.json(users)
})

app.get('/api/roles', async (req, res) => {
  const roles = await db('roles')
  res.json(roles)
})

module.exports = app
