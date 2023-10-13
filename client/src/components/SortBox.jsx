import { useState } from 'react'

const SortBox = () => {
  const [sortBy, setSortBy] = useState('Name')

  const handleSortChange = e => {
    setSortBy(e.target.value)
  }

  return (
    <div className='sort-box'>
      <label htmlFor='SortBy'>Sort By</label>
      <select id='SortBy' value={sortBy} onChange={handleSortChange}>
        <option value='Name'>Name</option>
        <option value='Address'>Address</option>
        <option value='Address'>Address</option>
        <option value='City'>City</option>
        <option value='PointOfContact'>Point of Contact</option>
      </select>
    </div>
  )
}

export default SortBox
