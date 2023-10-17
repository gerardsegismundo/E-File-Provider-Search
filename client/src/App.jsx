import IRSLocator from './components/IRSLocator'
import IRSTableGroup from './components/IRSTableGroup'
import SortBox from './components/SortBox'
import { Divider } from 'antd'

function App() {
  return (
    <div className='container'>
      <div className='header'>
        <IRSLocator />
        <SortBox />
      </div>
      <Divider style={{ marginBottom: '3rem' }} />
      <IRSTableGroup />
    </div>
  )
}

export default App
