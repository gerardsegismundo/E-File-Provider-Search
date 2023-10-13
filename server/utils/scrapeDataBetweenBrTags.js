import { load } from 'cheerio'

function scrapeDataBetweenBrTags(html) {
  const $ = load(html)
  const brElements = $('br')
  const labels = ['NameOfBusiness', 'Address', 'CityStateZIP', 'PointOfContact', 'Telephone', 'TypeOfService']
  const IRSInfo = {}
  let firstElement = brElements[0].prev

  if (firstElement && firstElement.type === 'text') {
    IRSInfo[labels[0]] = firstElement.data.trim()
  }

  for (let i = 0; i < brElements.length; i++) {
    const brElement = brElements[i]
    const nextElement = brElement.next

    if (nextElement && nextElement.type === 'text') {
      if (nextElement.data.trim() === '') {
        const anchorText = $('a', html).text()

        if (anchorText) {
          IRSInfo[labels[i + 1]] = anchorText
        }
      } else {
        IRSInfo[labels[i + 1]] = nextElement.data.trim()
      }
    }
  }

  return IRSInfo
}

export default scrapeDataBetweenBrTags
