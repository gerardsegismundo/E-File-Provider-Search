import express from 'express'
import cors from 'cors'

import scrapeRoute from './routes/scrape.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/scrape', scrapeRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`)
})
