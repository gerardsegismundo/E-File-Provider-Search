import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortBy } from '../redux/slice/IRSTableSlice'

import { Flex, Select, Form } from 'antd'
const { Option } = Select

const SortBox = () => {
  const [sortByOption, setSortByOption] = useState('Name')
  const dispatch = useDispatch()

  const handleSortChange = value => {
    setSortByOption(value)
    dispatch(sortBy(value))
  }

  return (
    <Flex align='self-end' style={{ marginLeft: 'auto' }} className='sort-box'>
      <label htmlFor='SortBy'>SortBy: </label>
      <Select id='SortBy' value={sortByOption} onChange={handleSortChange} style={{ width: 160 }}>
        <Option value='NameOfBusiness'>Name Of Business</Option>
        <Option value='Address'>Address</Option>
        <Option value='CityStateZIP'>City/State/ZIP</Option>
        <Option value='PointOfContact'>Point of Contact</Option>
      </Select>
    </Flex>
  )
}

export default SortBox
