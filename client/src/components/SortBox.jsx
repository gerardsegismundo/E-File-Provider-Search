import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const SortBox = () => {
  const [sortBy, setSortBy] = useState('Name')
  const { IRSProviders } = useSelector(state => state.IRSTable)
  const dispatch = useDispatch()

  const handleSortChange = e => {
    setSortBy(e.target.value)
    // sortIRS(e.target.value)
  }

  return (
    <div className='sort-box'>
      <label htmlFor='SortBy'>Sort By</label>
      <select id='SortBy' value={sortBy} onChange={handleSortChange}>
        <option value='Name'>Name</option>
        <option value='Address'>Address</option>
        <option value='CityStateZIP'>City</option>
        <option value='PointOfContact'>Point of Contact</option>
      </select>
    </div>
  )
}

export default SortBox
