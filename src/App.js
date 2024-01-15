import { StrictMode } from 'react'
import MapComponent from './MapComponent'
import ReverseGeocoding from './ReverseGeocoding'

const App = () => {
  return (
    <StrictMode>
      <div>
        <MapComponent />
        <ReverseGeocoding />
      </div>
    </StrictMode>
  )
}

export default App
