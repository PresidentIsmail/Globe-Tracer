import PropTypes from "prop-types";
import Message from "./Message";
import Spinner from "./Spinner";
import CityItem from "./CityItem";

import styles from "./CityList.module.css";

const CityList = ({ cities, isLoading }) => {
  // display a spinner if the data is loading
  if (isLoading) {
    return <Spinner />;
  }

  // display a message if there is no cities
  if (cities.length === 0) {
    return <Message message="No cities to display" />;
  }

  return (
    <div className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </div>
  );
};

// Add prop type validation for the cities and isLoading props
CityList.propTypes = {
  cities: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CityList;
