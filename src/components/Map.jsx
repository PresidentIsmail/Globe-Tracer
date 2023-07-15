import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

const Map = () => {
  // use useSearchParams to get the lat and long from the url
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // get the lat and long from the searchParams
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");

  // when user clicks anywhere on the map navigate to form page
  const handleClick = () => {
    navigate("/app/cities/add");
  };

  return (
    <div className={styles.mapContainer} onClick={handleClick}>
      <div className="map" >
        <h1>Map</h1>
        {lat && long && (
          // display some text
          <p>
            Latitude: {lat} - Longitude: {long}
          </p>
        )}
      </div>
    </div>
  );
};

export default Map;
