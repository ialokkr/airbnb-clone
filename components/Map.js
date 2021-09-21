import React, { useState } from 'react';
import ReactMapGL,{Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';


const Map = ({ searchResults }) => {
  const [selectedLocation, setSelectedLocation] = useState({})

  //Transform searchResults object result into the
  //{latitude , longitude}

  const coordinates = searchResults.map(result => ({
    
    longitude: result.long,
    latitude: result.lat,

  }))

  const center = getCenter(coordinates);

   const [viewport, setViewport] = React.useState({
    width: '100%',
    height:'100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 12
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/ialokkr/cktts12lc0csd17o8x3lhdiqb"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange = {(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map(result => (
        <div key={result.long}>
          <Marker
          longitude={result.long}
            latitude={result.lat}
             offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl 
            animate-bounce'
            >
            📌
            </p>
          </Marker>
          {/*The Popup that should show if we click on a marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={()=> setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
            {result.title}
            </Popup>
          ) : (
              false
          )}
        </div>
    ))}
    
    </ReactMapGL>
  )
}

export default Map
