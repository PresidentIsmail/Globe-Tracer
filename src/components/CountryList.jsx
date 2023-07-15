import PropTypes from "prop-types";
import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

import styles from "./CountryList.module.css";

const CountyList = ({ cities, isLoading }) => {
  // make a function that gets the unique countries from the cities array
  const getCountries = (cities) => {
    // create an empty array to store the countries
    const countries = [];

    // loop through the cities array
    cities.forEach((city) => {
      // check if the country is already in the countries array
      if (!countries.includes(city.country)) {
        // if not, add it to the countries array
        countries.push(city.country);
      }
    });

    // return the countries array
    return countries;
  };

  // get the unique countries from the cities array
  const countries = getCountries(cities);

  // display a spinner if the data is loading
  if (isLoading) {
    return <Spinner />;
  }

  // display a message if there is no cities
  if (countries.length === 0) {
    return <Message message="No countries to display" />;
  }

  return (
    <div className={styles.countryList}>
      {countries.map((country) => {
        return (
          <CountryItem
            key={Math.floor(Math.random() * 100000000)} // generate a random key
            country={country}
          />
        );
      })}
    </div>
  );
};

// Add prop type validation for the cities and isLoading props
CountyList.propTypes = {
  cities: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default CountyList;
