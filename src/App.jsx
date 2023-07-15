import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import all pages
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import MainApplication from "./pages/MainApplication";
import PageNotFound from "./pages/PageNotFound";
// nested route compoents
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

// json data url
const url = "http://localhost:4000/cities";

function App() {
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

  return (
    <Router>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<MainApplication />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="cities/add" element={<Form />} />
          <Route path="cities/:id" element={<City cities={cities} />} />
          <Route
            path="countries"
            element={<CountryList cities={cities} isLoading={isLoading} />}
          />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
