import React, { useState } from 'react'
import { Flex, Form, Input, Select, Button, Space, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import states from '../utils/data/states'
import {
  setIRSProviders,
  setFoundMatches,
  setDisplayNumbers,
  setCurrentLocation,
  setFetchFailed
} from '../redux/slice/IRSTableSlice'

const IRSLocator = () => {
  const [formData, setFormData] = useState({ zipCode: '', state: 'All' })
  const dispatch = useDispatch()

  const onFinish = async ({ zipCode, state }) => {
    if (!state) state = 'All'
    if (!zipCode) zipCode = ''

    try {
      const response = await fetch(`http://localhost:5000/api/scrape?state=${state}&zipCode=${zipCode}`)

      if (response.ok) {
        const data = await response.json()

        dispatch(setIRSProviders(data.IRSProviders))
        dispatch(setFoundMatches(data.foundMatches))
        dispatch(setDisplayNumbers(data.displayNumbers))
        dispatch(setCurrentLocation({ zipCode, state }))
        dispatch(setFetchFailed(false))
      } else {
        dispatch(setFetchFailed(true))
      }
    } catch (error) {
      setFetchFailed(true)
    }
  }

  return (
    <Form onFinish={onFinish} className='irs-locator' layout='inline'>
      <Typography.Title level={1}>File Provider Search Tool</Typography.Title>
      <Flex>
        <Form.Item label='Address' style={{ fontWeight: 600 }}>
          <Space.Compact>
            <Form.Item name='zipCode' noStyle defaultValue=''>
              <Input placeholder='Input zip code' />
            </Form.Item>

            <Form.Item name='state' style={{ width: 200 }}>
              <Select placeholder='Select state'>
                {states.map((state, i) => (
                  <Select.Option key={state.label + i} value={state.value}>
                    {state.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Space.Compact>
        </Form.Item>
        <Button type='primary' htmlType='submit' style={{ alignSelf: 'end' }}>
          Apply
        </Button>
      </Flex>
    </Form>
  )
}

export default IRSLocator
