import https from 'https'

function fetchData(url) {
  return new Promise((resolve, reject) => {
    https.get(url, webResponse => {
      let data = ''

      webResponse.on('data', chunk => {
        data += chunk
      })

      webResponse.on('end', () => {
        resolve(data)
      })

      webResponse.on('error', error => {
        reject(error)
      })
    })
  })
}

export default fetchData
