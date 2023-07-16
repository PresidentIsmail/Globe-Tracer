// import the prop types
import PropTypes from "prop-types";

import styles from "./CountryItem.module.css";

// import function that gets the country code
import { getCountryCode } from "../custom-functions/getCountryCode";

const CountryItem = ({ country }) => {
  // Get the country code for the country
  const countryCode = getCountryCode(country);

  return (
    <div className={styles.countryItem}>
      {/* Make sure the 'fi' class is added here */}
      <span className={` fi fi-${countryCode}`} />
      <h2>{country}</h2>
    </div>
  );
};

// Add prop type validation for the country prop
CountryItem.propTypes = {
  country: PropTypes.string.isRequired,
};

export default CountryItem;
