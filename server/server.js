import express from 'express'
import { load } from 'cheerio'
import cors from 'cors'
import https from 'https'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/scrape', async (req, res) => {
  const { state, zipCode } = req.query
  console.log({ state, zipCode })

  const firstbaseUrl = `https://www.irs.gov/efile-index-taxpayer-search?zip=${zipCode}&state=${state}`

  try {
    https.get(firstbaseUrl, webResponse => {
      let data = ''

      webResponse.on('data', chunk => {
        data += chunk
      })

      webResponse.on('end', () => {
        const $ = load(data)
        const businesses = []

        const elements = $('.views-field-nothing-1').toArray()

        for (const element of elements) {
          const businessData = $.html(element)
          const businessInfo = scrapeDataBetweenBrTags(businessData)
          businesses.push(businessInfo)
        }

        console.log(businesses)

        res.json(businesses)
      })
    })
  } catch (error) {
    console.log('Scraping failed')
    res.status(500).json({ error: 'Scraping failed' })
  }
})

function scrapeDataBetweenBrTags(html) {
  const $ = load(html)
  const brElements = $('br')
  const labels = ['NameOfBusiness', 'Address', 'CityStateZIP', 'PointOfContact', 'Telephone', 'TypeOfService']
  const businessInfo = {}
  let firstElement = brElements[0].prev

  if (firstElement && firstElement.type === 'text') {
    businessInfo[labels[0]] = firstElement.data.trim()
  }

  for (let i = 0; i < brElements.length; i++) {
    const brElement = brElements[i]
    const nextElement = brElement.next

    if (nextElement && nextElement.type === 'text') {
      if (nextElement.data.trim() === '') {
        const anchorText = $('a', html).text()

        if (anchorText) {
          businessInfo[labels[i + 1]] = anchorText
        }
      } else {
        businessInfo[labels[i + 1]] = nextElement.data.trim()
      }
    }
  }

  return businessInfo
}

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Listening to port ${PORT}`))
