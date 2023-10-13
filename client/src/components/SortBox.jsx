import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortBy } from '../redux/slice/IRSTableSlice'

const SortBox = () => {
  const [sortByOption, setSortByOption] = useState('Name')
  const dispatch = useDispatch()

  const handleSortChange = e => {
    const sortOption = e.target.value

    setSortByOption(sortOption)
    dispatch(sortBy(sortOption))
  }

  return (
    <div className='sort-box'>
      <label htmlFor='SortBy'>Sort By</label>
      <select id='SortBy' value={sortByOption} onChange={handleSortChange}>
        <option value='NameOfBusiness'>Name Of Business</option>
        <option value='Address'>Address</option>
        <option value='CityStateZIP'>City/State/ZIP</option>
        <option value='PointOfContact'>Point of Contact</option>
      </select>
    </div>
  )
}

export default SortBox
