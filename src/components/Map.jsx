import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

import { useCitiesContext } from "../context/CitiesContext";
import styles from "./Map.module.css";

// function to get country code
import { getCountryCode } from "../custom-functions/getCountryCode";
import { useEffect, useState } from "react";

const Map = () => {
  // use useSearchParams to get the lat and long from the url
  const [searchParams] = useSearchParams();
  // get cities from the context
  const { cities } = useCitiesContext();
  const [mapPosition, setMapPosition] = useState([40, -3]); // [lat, lng]

  // get the lat and long from the searchParams
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // sync the map position with the searchParams in useEffect
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={8} className={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span className={`fi fi-${getCountryCode(city.country)}`} />
              {city.cityName}
            </Popup>
          </Marker>
        ))}

        {/* custom component to change the center of the map */}
        <ChangeCenter mapPosition={mapPosition} />
        {/* custom component to add click event listener to the map */}
        <ClickAnywhereToOpenForm />
      </MapContainer>
    </div>
  );
};

// custom component to change the center of the map. takes in mapPostion as props
const ChangeCenter = ({ mapPosition }) => {
  // get the map object from useMap hook
  const map = useMap();
  map.setView(mapPosition);
  return null;
};

// prop type validation
ChangeCenter.propTypes = {
  mapPosition: PropTypes.array.isRequired,
};

// make a component that adds click event listener to the map so when user clicks anywhere on the map navigate to form page
const ClickAnywhereToOpenForm = () => {
  const navigate = useNavigate();
  // use useMap hook to get the map object
  const map = useMap();
  // use useEffect to add click event listener to the map
  useEffect(() => {
    map.on("click", (event) => {
      // navigate to the form page and pass the lat and lng as query params in the event handler
      navigate(`cities/add?lat=${event.latlng.lat}&lng=${event.latlng.lng}`);
    });
  }, [map, navigate]);
  return null;
};

export default Map;
