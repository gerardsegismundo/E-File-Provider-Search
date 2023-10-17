import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortBy } from '../redux/slice/IRSTableSlice'

import { Flex, Select } from 'antd'
const { Option } = Select

const SortBox = () => {
  const [sortByOption, setSortByOption] = useState('Name')
  const { IRSProviders } = useSelector(state => state.IRSTable)
  const dispatch = useDispatch()

  const handleSortChange = value => {
    setSortByOption(value)
    dispatch(sortBy(value))
  }

  return (
    <Flex align='self-end' style={{ marginLeft: 'auto' }}>
      <label htmlFor='SortBy' style={{ fontWeight: 600, marginBottom: '0.5rem', marginRight: '0.5rem' }}>
        SortBy:
      </label>
      <Select
        id='SortBy'
        value={sortByOption}
        onChange={handleSortChange}
        style={{ width: 160 }}
        disabled={IRSProviders.length <= 0}
      >
        <Option value='NameOfBusiness'>Name Of Business</Option>
        <Option value='Address'>Address</Option>
        <Option value='CityStateZIP'>City/State/ZIP</Option>
        <Option value='PointOfContact'>Point of Contact</Option>
      </Select>
    </Flex>
  )
}

export default SortBox
