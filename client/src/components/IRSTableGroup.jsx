import { ReactComponent as ChevRight } from '../svg/chev-right.svg'
import { ReactComponent as ChevLeft } from '../svg/chev-left.svg'
import { useSelector } from 'react-redux'

const IRSTableGroup = () => {
  const { IRSProviders, foundMatches } = useSelector(state => state.IRSTable)

  return (
    <div className='irs-table-group'>
      {foundMatches > 0 && (
        <>
          <h3>Found {foundMatches} Matching Items; Displaying 1 - 10.</h3>
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
          {foundMatches < 10 ? (
            ''
          ) : (
            <div className='table-pager'>
              <button>
                <ChevLeft />
              </button>
              <button>
                <ChevRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default IRSTableGroup
