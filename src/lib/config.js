require('dotenv').config()

if (!process.env.DB_URI)
  console.error('The DB_URI env variable is not declared')

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.API_PORT || '3001',
  host: process.env.API_HOST || 'localhost',
  cors: process.env.CORS || 'http://localhost:3001',
  dbURI: process.env.DB_URI
}

module.exports = config
