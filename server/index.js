import express from 'express'
import pool from './db.js'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://harsha.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

const __dirname = path.resolve()

app.use(express.json())

app.post('/api/message', async (req, res) => {
    const { name, email, question } = req.body

    try {
        const newQuery = await pool.query('INSERT INTO query (name, email, question) VALUES ($1, $2, $3) RETURNING *', [name, email, question])
        res.json(newQuery.rows[0])
    } catch (error) {
        console.error('Error inserting query:', error)
        res.status(500).json({ error: 'Failed to insert query' })
    }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' })
})

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/app/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'app', 'dist', 'index.html'))
    })
}

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})

export default app