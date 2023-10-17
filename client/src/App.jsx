import IRSLocator from './components/IRSLocator'
import IRSTableGroup from './components/IRSTableGroup'
import SortBox from './components/SortBox'
import { Divider, Flex, Layout } from 'antd'

const layoutStyle = {
  margin: '7rem auto 0 auto',
  padding: '0 5vw',
  width: '100%',
  backgroundColor: '#ffffff'
}

function App() {
  return (
    <Layout style={layoutStyle}>
      <Flex>
        <IRSLocator />
        <SortBox />
      </Flex>
      <Divider style={{ marginBottom: '3rem' }} />
      <IRSTableGroup />
    </Layout>
  )
}

export default App
