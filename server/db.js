import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const Pool = pg.Pool

const pool = new Pool({
    connectionString: process.env.DATABASE_URI,
    ssl: {
      rejectUnauthorized: false
    }
})

export default pool
