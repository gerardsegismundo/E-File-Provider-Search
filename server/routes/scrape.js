import express from 'express'
import { fetchData, scrapeDataBetweenBrTags } from '../utils/index.js'
import { load } from 'cheerio'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { state, zipCode } = req.query
    const firstBaseUrl = `https://www.irs.gov/efile-index-taxpayer-search?zip=${zipCode}&state=${state}`

    const data = await fetchData(firstBaseUrl)

    const IRSProviders = []

    const $ = load(data)

    const headingText = $('#solr-results-summary').text()
    const foundMatches = headingText.match(/Found (\d+) Matching Items/)[1]

    const tdElements = $('.views-field-nothing-1').toArray()
    for (const tdElement of tdElements) {
      const IRSProviderData = $.html(tdElement)
      const IRSInfo = scrapeDataBetweenBrTags(IRSProviderData)
      IRSProviders.push(IRSInfo)
    }
    res.json({ IRSProviders, foundMatches })
  } catch (error) {
    console.log('Scraping failed', error)
    res.status(500).json({ error: 'Scraping failed' })
  }
})

export default router
