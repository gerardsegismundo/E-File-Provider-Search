import { ReactComponent as ChevRight } from '../svg/chev-right.svg'
import { ReactComponent as ChevLeft } from '../svg/chev-left.svg'
import { useSelector } from 'react-redux'

const IRSTableGroup = () => {
  const { tableData } = useSelector(state => state.IRSTable)

  return (
    <div className='irs-table-group'>
      <h3>Found 51 Matching Items; Displaying 1 - 10.</h3>
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

          {tableData.map(d => (
            <tr>
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
      <div className='table-pager'>
        <button>
          <ChevLeft />
        </button>
        <button>
          <ChevRight />
        </button>
      </div>
    </div>
  )
}

export default IRSTableGroup
