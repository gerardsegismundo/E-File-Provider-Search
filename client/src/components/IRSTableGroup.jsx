import { ReactComponent as ChevRight } from '../utils/svg/chev-right.svg'
import { ReactComponent as ChevLeft } from '../utils/svg/chev-left.svg'
import { useSelector, useDispatch } from 'react-redux'
import { setIRSProviders, setDisplayNumbers, setCurrentPage } from '../redux/slice/IRSTableSlice'

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

  return (
    <div className='irs-table-group'>
      {fetchFailed ? (
        <div className='fetch-failed-message'>
          <h2>Your search did not return any results. Please try again.</h2>
        </div>
      ) : (
        foundMatches > 0 && (
          <>
            <h2>Found {foundMatches} matching items.</h2>
            <h3>
              Displaying {displayNumbers.start} - {displayNumbers.end}:
            </h3>
            <table>
              <tbody>
                <tr>
                  <th>Name of Business</th>
                  <th>Address</th>
                  <th>City/State/ZIP</th>
                  <th>Point Of Contact</th>
                  <th>Telephone</th>
                  <th>Type of Service</th>
                </tr>

                {IRSProviders.map((d, i) => (
                  <tr key={i}>
                    <th>{d.NameOfBusiness}</th>
                    <th>{d.Address}</th>
                    <th>{d.CityStateZIP}</th>
                    <th>{d.PointOfContact}</th>
                    <th>{d.Telephone}</th>
                    <th>{d.TypeOfService}</th>
                  </tr>
                ))}
              </tbody>
            </table>
            {foundMatches >= 10 && (
              <div className='table-pager'>
                {displayNumbers.start >= 2 && (
                  <button onClick={handlePrevPage}>
                    <ChevLeft />
                  </button>
                )}

                {displayNumbers.end < foundMatches && (
                  <button onClick={handleNextPage}>
                    <ChevRight />
                  </button>
                )}
              </div>
            )}
          </>
        )
      )}
    </div>
  )
}

export default IRSTableGroup
