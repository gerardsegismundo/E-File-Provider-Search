import express from 'express'
import cors from 'cors'
import path from 'path'

import scrapeRoute from './routes/scrape.js'

// Define __dirname using ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname)

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/scrape', scrapeRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (_req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening to port ${PORT}`))
