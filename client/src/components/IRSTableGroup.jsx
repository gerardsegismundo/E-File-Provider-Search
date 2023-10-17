import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useSelector, useDispatch } from 'react-redux'
import { setIRSProviders, setDisplayNumbers, setCurrentPage, setFetchFailed } from '../redux/slice/IRSTableSlice'
import { Typography, Table, Pagination, Skeleton, Result, Spin, Space, Flex } from 'antd'

const { Title } = Typography

const IRSTableGroup = () => {
  const [pageLoading, setPageLoading] = useState(false)
  const { IRSProviders, foundMatches, displayNumbers, currentPage, currentLocation, fetchFailed, tableLoading } =
    useSelector(state => state.IRSTable)

  const dispatch = useDispatch()

  const fetchData = async pageOffset => {
    setPageLoading(true)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_API}/api/scrape?state=${currentLocation.state}&zipCode=${
          currentLocation.zipCode
        }&page=${currentPage - 1 + pageOffset}`
      )

      if (response.ok) {
        const data = await response.json()
        dispatch(setIRSProviders(data.IRSProviders))
        dispatch(setDisplayNumbers(data.displayNumbers))
        dispatch(setCurrentPage(currentPage - 1 + pageOffset))
      }
    } catch (error) {
      dispatch(setFetchFailed(true))
    } finally {
      setPageLoading(false)
    }
  }

  if (tableLoading) {
    return (
      <Space
        direction='vertical'
        style={{
          width: '100%',
          marginTop: '10rem'
        }}
      >
        <Spin tip='Loading...' size='large'>
          <div className='content' />
        </Spin>
      </Space>
    )
  }

  if (fetchFailed) {
    return <Result status='warning' title='Your search did not return any results. Please try again.' />
  }

  return (
    <div className='irs-table-group'>
      {foundMatches > 0 && (
        <>
          <Title level={2}>Authorized IRS e-file Providers</Title>
          <Flex>
            <Title level={3}>
              Found {foundMatches.toLocaleString()} matching items. Displaying {displayNumbers.start} -{' '}
              {displayNumbers.end}:
            </Title>
          </Flex>
          {pageLoading ? (
            <Skeleton active paragraph={{ rows: 20 }} />
          ) : (
            <Table dataSource={IRSProviders} pagination={false} rowKey={() => uuidv4()} style={{ margin: '3rem 0' }}>
              <Table.Column title='Name of Business' dataIndex='NameOfBusiness' key='NameOfBusiness' />
              <Table.Column title='Address' dataIndex='Address' key='Address' />
              <Table.Column title='City/State/ZIP' dataIndex='CityStateZIP' key='CityStateZIP' />
              <Table.Column title='Point Of Contact' dataIndex='PointOfContact' key='PointOfContact' />
              <Table.Column title='Telephone' dataIndex='Telephone' key='Telephone' />
              <Table.Column title='Type of Service' dataIndex='TypeOfService' key='TypeOfService' />
            </Table>
          )}

          {foundMatches >= 10 && (
            <Pagination
              current={currentPage + 1}
              total={foundMatches}
              onChange={page => fetchData(page - currentPage)}
              showSizeChanger={false}
              style={{ float: 'right' }}
            />
          )}
        </>
      )}
    </div>
  )
}

export default IRSTableGroup
