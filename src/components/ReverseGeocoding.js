import { useState } from 'react'

const ReverseGeocoding = () => {
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 })
  const [destination, setDestination] = useState(null)

  const handleCoordinateChange = event => {
    const { name, value } = event.target
    setCoordinates((prev) => ({ ...prev, [name]: parseFloat(value) }))
  }

  const handleReverseGeocode = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}`
      )

      if (!response.ok) {
        throw new Error('Reverse geocoding failed')
      }

      const data = await response.json()
      const geocodedPlace = {
        latitude: parseFloat(data.lat),
        longitude: parseFloat(data.lon),
      }

      setDestination(geocodedPlace)
    } catch (error) {
      console.error(error)
    }
  }

  const handleGetDirections = async () => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${coordinates.longitude},${coordinates.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`
      )

      if (!response.ok) {
        throw new Error('Getting directions failed')
      }

      const data = await response.json()

      // Extract coordinates from the route
      const routeCoordinates = data.routes[0].geometry.coordinates

      // Update the map with the routeCoordinates using OpenLayers logic (not shown here)

      console.log('Directions:', routeCoordinates)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Reverse Geocoding</h2>
      <label>
        Latitude:
        <input type="number" name="latitude" value={coordinates.latitude} onChange={handleCoordinateChange} />
      </label>
      <label>
        Longitude:
        <input type="number" name="longitude" value={coordinates.longitude} onChange={handleCoordinateChange} />
      </label>
      <button onClick={handleReverseGeocode}>Reverse Geocode</button>

      {destination && (
        <div>
          <h3>Destination</h3>
          <p>{`Latitude: ${destination.latitude}, Longitude: ${destination.longitude}`}</p>
          <button onClick={handleGetDirections}>Get Directions</button>
        </div>
      )}
    </div>
  )
}

export default ReverseGeocodingComponent
