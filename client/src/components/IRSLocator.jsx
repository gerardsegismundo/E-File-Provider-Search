import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import states from '../data/states'
import { setIRSProviders, setFoundMatches, setDisplayNumbers, setCurrentLocation } from '../redux/slice/IRSTableSlice'

const IRSLocator = () => {
  const [formData, setFormData] = useState({ state: 6, zipCode: 93036 })
  const dispatch = useDispatch()

  const handleFormChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { state, zipCode } = formData

    try {
      const response = await fetch(`http://localhost:5000/api/scrape?state=${state}&zipCode=${zipCode}`)

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(setIRSProviders(data.IRSProviders))
        dispatch(setFoundMatches(data.foundMatches))
        dispatch(setDisplayNumbers(data.displayNumbers))
        dispatch(setCurrentLocation({ state, zipCode }))
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
          <input id='ZipCode' type='text' name='zipCode' value={formData.zipCode} onChange={handleFormChange} />
        </div>
        <div className='input-group'>
          <label htmlFor='State'>State</label>
          <select id='State' name='state' value={formData.state} onChange={handleFormChange}>
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
