import { useState } from 'react'
import states from '../data/states'

const IRSLocator = () => {
  const [state, setState] = useState(6)
  const [zipCode, setzipCode] = useState(93036)
  // const [scrapedData, setScrapedData] = useState([])

  const handleStateChange = e => {
    setState(e.target.value)
  }

  const handleZipCodeChange = e => {
    setzipCode(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const response = await fetch(`http://localhost:5000/api/scrape?state=${state}&zipCode=${zipCode}`)

      if (response.ok) {
        const data = await response.json()
        console.log(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='irs-locator'>
      <div className='row'>
        <div className='input-group'>
          <label htmlFor='ZipCode'>Zip Code</label>
          <input id='ZipCode' type='text' value={zipCode} onChange={handleZipCodeChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='State'>State</label>
          <select id='State' value={state} onChange={handleStateChange}>
            {states.map((state, i) => (
              <option key={state.label + i} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Apply</button>
      </div>
    </form>
  )
}

export default IRSLocator
