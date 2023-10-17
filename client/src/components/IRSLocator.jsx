import { Flex, Form, Input, Select, Button, Space, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import states from '../utils/data/states'
import {
  setIRSProviders,
  setFoundMatches,
  setDisplayNumbers,
  setCurrentLocation,
  setFetchFailed,
  setCurrentPage,
  setTableLoading
} from '../redux/slice/IRSTableSlice'

const IRSLocator = () => {
  const { tableLoading } = useSelector(state => state.IRSTable)
  const dispatch = useDispatch()

  const onFinish = async ({ zipCode, state }) => {
    if (!state) state = 'All'
    if (!zipCode) zipCode = ''

    dispatch(setTableLoading(true))

    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_API}/api/scrape?state=${state}&zipCode=${zipCode}`)

      if (response.ok) {
        const data = await response.json()

        dispatch(setIRSProviders(data.IRSProviders))
        dispatch(setFoundMatches(data.foundMatches))
        dispatch(setDisplayNumbers(data.displayNumbers))
        dispatch(setCurrentPage(0))
        dispatch(setCurrentLocation({ zipCode, state }))

        dispatch(setFetchFailed(false))
      } else {
        dispatch(setFetchFailed(true))
        dispatch(setIRSProviders([]))
      }
    } catch (error) {
      dispatch(setFetchFailed(true))
      dispatch(setIRSProviders([]))
    } finally {
      dispatch(setTableLoading(false))
    }
  }

  return (
    <Form onFinish={onFinish} className='irs-locator' layout='inline' style={{ flexDirection: 'column' }}>
      <Typography.Title level={1} style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
        E-File Provider Search Tool
      </Typography.Title>
      <Flex>
        <Form.Item label='Address' style={{ fontWeight: 600 }}>
          <Space.Compact>
            <Form.Item name='zipCode' noStyle defaultValue=''>
              <Input placeholder='Enter zip code' />
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
        <Button htmlType='submit' style={{ alignSelf: 'end' }} loading={tableLoading} icon={<SearchOutlined />}>
          Search
        </Button>
      </Flex>
    </Form>
  )
}

export default IRSLocator
