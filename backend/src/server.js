import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectToDatabase } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import itemRoutes from './routes/itemRoutes.js'
import registrationRoutes from './routes/registrationRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
	return res.json({ status: 'ok', service: 'testDemo-backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/registrations', registrationRoutes)
app.use('/api/applications', applicationRoutes)

// Global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
	console.error('Unhandled error:', err)
	return res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' })
})

const PORT = process.env.PORT || 5000

connectToDatabase()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Backend listening on http://localhost:${PORT}`)
		})
	})
	.catch((err) => {
		console.error('Failed to connect to database:', err)
		process.exit(1)
	})


