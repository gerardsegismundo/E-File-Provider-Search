import express from 'express'
import { fetchData, extractData } from '../utils/index.js'
import { load } from 'cheerio'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const { state, zipCode, page } = req.query

    let baseUrl = `https://www.irs.gov/efile-index-taxpayer-search?zip=${zipCode}&state=${state}`

    let currentPage = 0

    if (page) {
      baseUrl += `&page=${page}`
      currentPage = page
    }

    const data = await fetchData(baseUrl)

    const IRSProviders = []

    const $ = load(data)

    const headingText = $('#solr-results-summary').text()
    const foundMatches = Number(headingText.match(/Found (\d+) Matching Items/)[1])
    const displayingNumbers = headingText.match(/Displaying (\d+) - (\d+)/)

    const displayNumbers = {
      start: Number(displayingNumbers[1]),
      end: Number(displayingNumbers[2])
    }

    const tdElements = $('.views-field-nothing-1').toArray()

    for (const tdElement of tdElements) {
      const extractedData = extractData(tdElement)
      IRSProviders.push(extractedData)
    }

    res.json({ IRSProviders, foundMatches, displayNumbers, currentPage })
  } catch (error) {
    console.log('Scraping failed', error)
    res.status(500).json({ error: 'Scraping failed' })
  }
})

export default router
