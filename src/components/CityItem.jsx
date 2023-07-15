import { Link, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import "/node_modules/flag-icons/css/flag-icons.min.css";

import styles from "./CityItem.module.css";

// import function that gets the country code
import { getCountryCode } from "../custom-functions/getCountryCode";

const CityItem = ({ city }) => {
  const { id, cityName, date, country, position } = city;
  // destructure lat as latitude and long as longitude from position
  const { lat: latitude, lng: longitude } = position;

  // Get the country code for the country name to display the flag
  const countryCode = getCountryCode(
    country.charAt(0).toUpperCase() + country.slice(1)
  );

  // Format the date
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  return (
    // link to id and set query params for lat and long
    <Link
      to={`${id}?lat=${latitude}&long=${longitude}`}
      className={styles.cityItem}
    >
      {/* Make sure the 'fi' class is added here */}
      <span className={`${styles.emoji} fi fi-${countryCode}`} />
      <h2 className={styles.name}>{cityName}</h2>
      <time className={styles.date}>{formatDate(date)}</time>
      <button className={styles.deleteBtn}>&times;</button>
    </Link>
  );
};

// Add prop type validation for the city prop
CityItem.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cityName: PropTypes.string.isRequired,
    emoji: PropTypes.string,
    date: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }).isRequired,
};

export default CityItem;
