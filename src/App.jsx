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
// import context
import { CitiesProvider, useCitiesContext } from "./context/CitiesContext";

function App() {

  return (
    // wrap context provider around the router
    <CitiesProvider>
      <Router>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<MainApplication />}>
            {/* Nested Routes */}
            <Route index element={<CityList />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/add" element={<Form />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </CitiesProvider>
  );
}

export default App;
