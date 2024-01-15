import { useEffect } from 'react'
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Fill, Stroke } from 'ol/style'
import LineString from 'ol/geom/LineString'
import Feature from 'ol/Feature'

const MapComponent = ({ destination }) => {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource(),
          style: new Style({
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)',
            }),
            stroke: new Stroke({
              color: '#ffcc33',
              width: 2,
            }),
          }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    })

    if (destination) {
      const currentLocation = [0, 0] // Replace with actual current location

      const route = new LineString([currentLocation, [destination.longitude, destination.latitude]])

      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [new Feature(route)],
        }),
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 5,
          }),
        }),
      })

      map.addLayer(vectorLayer)
      map.getView().fit(route.getExtent(), map.getSize())
    }
  }, [destination])

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>
}

export default MapComponent
