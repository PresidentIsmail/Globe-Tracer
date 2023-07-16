import Message from "./Message";
import Spinner from "./Spinner";
import CityItem from "./CityItem";

import styles from "./CityList.module.css";
import { useCitiesContext } from "../context/CitiesContext";

const CityList = () => {
  // get the cities and isLoading values from the context
  const { cities, isLoading } = useCitiesContext();

  // display a spinner if the data is loading
  if (isLoading) {
    return <Spinner />;
  }

  // display a message if there is no cities
  if (cities.length === 0) {
    return <Message>No cities to display</Message>;
  }

  return (
    <div className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </div>
  );
};

export default CityList;
