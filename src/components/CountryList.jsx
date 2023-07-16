import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";

import styles from "./CountryList.module.css";
import { useCitiesContext } from "../context/CitiesProvider";

const CountyList = () => {
  // get the cities and isLoading values from the context
  const { cities, isLoading } = useCitiesContext();

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



export default CountyList;
