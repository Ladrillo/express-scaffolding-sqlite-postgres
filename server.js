const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const session = require('express-session')
const db = require('./database/dbConfig')
const { secure, origin, domain } = require('./config/index')

const app = express()

var corsOptions = {
  origin, // array of admissible origins
  credentials: true,
}

const cookieConfig = {
  maxAge: 1000 * 60 * 60,
  httpOnly: false,
  sameSite: 'None',
  secure,
  domain,
}

const sessionConfig = {
  name: 'monkey',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure,
    httpOnly: false,
  },
  resave: false,
  saveUninitialized: false,
};


const lastEndpointUsed = (last) => (_, res, next) => {
  res.cookie('lastEndpoint', last, cookieConfig)
  next()
}

// app.use(helmet())
app.use(express.json())
app.use(cors(corsOptions))
app.use(session(sessionConfig))

app.get('/api', lastEndpointUsed('api'), (_, res) => {
  res.json({ server: 'up' })
})

app.get('/api/login', lastEndpointUsed('api'), (req, res) => {
  req.session.user = { name: req.query.name }
  res.json({ user: req.query.name })
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
