import IRSLocator from './components/IRSLocator'
import IRSTableGroup from './components/IRSTableGroup'
import SortBox from './components/SortBox'
import { Typography } from 'antd'

function App() {
  return (
    <div className='container'>
      <div className='header'>
        <IRSLocator />
        <SortBox />
      </div>
      <IRSTableGroup />
    </div>
  )
}

export default App
