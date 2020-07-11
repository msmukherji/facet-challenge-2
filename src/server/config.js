// require('dotenv').config()
const Pool = require('pg').Pool
const isProd = process.env.NODE_ENV === 'production'

const findPool = () => {
	if (isProd) {
		return new Pool({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false
			}
		})
	} else {
		return new Pool({
		  // user: 'me',
		  host: '127.0.0.1',
		  database: 'moneyz',
		  password: '',
		  port: 5432,
		})
	}
}

const pool = findPool()

module.exports = {
	pool
}
