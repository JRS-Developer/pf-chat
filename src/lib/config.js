require('dotenv').config()

if (!process.env.DB_URI)
  console.error('The DB_URI env variable is not declared')

const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || '8080',
  // port_io: process.env.IO_PORT || '80',
  host: process.env.API_HOST || 'localhost',
  cors: process.env.CORS || 'http://localhost:3000',
  dbURI: process.env.DB_URI,
}

module.exports = config
