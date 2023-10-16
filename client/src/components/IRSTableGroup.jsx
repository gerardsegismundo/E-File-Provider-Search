import { ReactComponent as ChevRight } from '../utils/svg/chev-right.svg'
import { ReactComponent as ChevLeft } from '../utils/svg/chev-left.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setIRSProviders, setDisplayNumbers, setCurrentPage } from '../redux/slice/IRSTableSlice'
import { Typography, Table, Button, Pagination } from 'antd'

const { Title, Text } = Typography

const IRSTableGroup = () => {
  const { IRSProviders, foundMatches, displayNumbers, currentPage, currentLocation, fetchFailed } = useSelector(
    state => state.IRSTable
  )
  const dispatch = useDispatch()

  const fetchData = async pageOffset => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/scrape?state=${currentLocation.state}&zipCode=${currentLocation.zipCode}&page=${
          currentPage + pageOffset
        }`
      )
      if (response.ok) {
        const data = await response.json()
        dispatch(setIRSProviders(data.IRSProviders))
        dispatch(setDisplayNumbers(data.displayNumbers))
        dispatch(setCurrentPage(currentPage + pageOffset))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlePrevPage = () => {
    fetchData(-1)
  }

  const handleNextPage = () => {
    fetchData(1)
  }

  // Pagination configuration
  const paginationConfig = {
    pageSize: 10, // Number of items to display per page
    current: currentPage, // Current page
    total: foundMatches, // Total number of items
    onChange: page => {
      fetchData(page - currentPage)
    }
  }

  return (
    <div className='irs-table-group'>
      {fetchFailed ? (
        <div className='fetch-failed-message'>
          <Title level={2}>Your search did not return any results. Please try again.</Title>
        </div>
      ) : (
        foundMatches > 0 && (
          <>
            <Title level={2}>Found {foundMatches} matching items.</Title>
            <Title level={3}>
              Displaying {displayNumbers.start} - {displayNumbers.end}:
            </Title>
            <Table dataSource={IRSProviders} pagination={false}>
              <Table.Column title='Name of Business' dataIndex='NameOfBusiness' key='NameOfBusiness' />
              <Table.Column title='Address' dataIndex='Address' key='Address' />
              <Table.Column title='City/State/ZIP' dataIndex='CityStateZIP' key='CityStateZIP' />
              <Table.Column title='Point Of Contact' dataIndex='PointOfContact' key='PointOfContact' />
              <Table.Column title='Telephone' dataIndex='Telephone' key='Telephone' />
              <Table.Column title='Type of Service' dataIndex='TypeOfService' key='TypeOfService' />
            </Table>

            {foundMatches >= 10 && (
              <Pagination
                current={currentPage}
                total={foundMatches}
                onChange={page => fetchData(page - currentPage)}
                showSizeChanger={false}
                style={{ float: 'right' }}
              />
            )}
          </>
        )
      )}
    </div>
  )
}

export default IRSTableGroup
