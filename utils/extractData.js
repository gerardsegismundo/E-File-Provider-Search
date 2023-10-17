// import { load } from 'cheerio'

// function extractData(tdContent) {
//   const $ = load(tdContent)
//   const brElements = $('br')
//   const labels = ['NameOfBusiness', 'Address', 'CityStateZIP', 'PointOfContact', 'Telephone', 'TypeOfService']
//   const IRSInfo = {}

//   let firstElement = brElements[0].prev
//   IRSInfo[labels[0]] = firstElement.data.trim()

//   if (brElements.length === 6) {
//     const secondData = brElements[0].next.data.trim()
//     const thirdData = brElements[1].next.data.trim()
//     IRSInfo[labels[1]] = `${secondData}, ${thirdData}`

//     IRSInfo[labels[2]] = brElements[2].next.data.trim()
//     IRSInfo[labels[3]] = brElements[3].next.data.trim()
//     IRSInfo[labels[4]] = $('a', tdContent).text()
//     IRSInfo[labels[5]] = brElements[5].next.data.trim()
//   } else {
//     for (let i = 0; i < brElements.length; i++) {
//       const brElement = brElements[i]
//       const nextElement = brElement.next

//       const nextText = nextElement.data.trim()

//       const anchorText = $('a', tdContent).text()

//       if (anchorText) {
//         IRSInfo['Telephone'] = anchorText
//       }

//       IRSInfo[labels[i + 1]] = nextText
//     }
//   }

//   return IRSInfo
// }

// export default extractData

import { load } from 'cheerio'

function extractData(tdContent) {
  const $ = load(tdContent)
  const brElements = $('br')
  const labels = ['NameOfBusiness', 'Address', 'CityStateZIP', 'PointOfContact', 'Telephone', 'TypeOfService']
  const IRSInfo = {}

  function getTrimmedData(element) {
    return element.data.trim()
  }

  IRSInfo[labels[0]] = getTrimmedData(brElements[0].prev)

  if (brElements.length === 6) {
    IRSInfo[labels[1]] = `${getTrimmedData(brElements[0].next)}, ${getTrimmedData(brElements[1].next)}`
    IRSInfo[labels[2]] = getTrimmedData(brElements[2].next)
    IRSInfo[labels[3]] = getTrimmedData(brElements[3].next)
    IRSInfo[labels[4]] = $('a', tdContent).text()
    IRSInfo[labels[5]] = getTrimmedData(brElements[5].next)
  } else {
    for (let i = 0; i < brElements.length; i++) {
      const brElement = brElements[i]
      const nextElement = brElement.next
      const nextText = getTrimmedData(nextElement)
      const anchorText = $('a', tdContent).text()

      if (anchorText) {
        IRSInfo[labels[4]] = anchorText
      }

      IRSInfo[labels[i + 1]] = nextText
    }
  }

  return IRSInfo
}

export default extractData
