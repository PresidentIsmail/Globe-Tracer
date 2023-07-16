import { useState, createContext, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const CitiesContext = createContext();

// json data url
const url = "http://localhost:4000/cities";

const CitiesProvider = ({ children }) => {
  // fetch data from the json server and store them using the useState hook
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // fetch data from the json server in an async function
  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const cities = await response.json();
      setCities(cities);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // call the fetchCities function when the component mounts
  useEffect(() => {
    fetchCities();
  }, []);

  // return the context provider
  return (
    <CitiesContext.Provider value={{ cities, isLoading, setIsLoading }}>
      {children}
    </CitiesContext.Provider>
  );
};

// props validation
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// make a custom hook for accessing the cities context
const useCitiesContext = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error(
      "useCitiesContext must be used within a CitiesProvider component"
    );
  }
  return context;
};

export { CitiesProvider, useCitiesContext };
