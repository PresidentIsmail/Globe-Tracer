import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import all pages
// import Homepage from "./pages/Homepage";
// import Login from "./pages/Login";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import MainApplication from "./pages/MainApplication";
// import PageNotFound from "./pages/PageNotFound";

// lazy load pages
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const MainApplication = lazy(() => import("./pages/MainApplication"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// nested route compoents
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
// import context
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoadingSkeleton from "./components/LoadingSkeleton";

function App() {
  const { isAuthenticated } = useAuth();

  // set the loader to load for a minimum of 2 seconds
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Simulate a minimum delay of 2 seconds
    const timeoutId = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    // Clean up the timeout if the component unmounts before the 2 seconds
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    // wrap context providers around the router

    <CitiesProvider>
      <Router>
        <Suspense fallback={<LoadingSkeleton />}>
          {showLoader ? (
            <LoadingSkeleton />
          ) : (
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route path="/login" element={<Login />} />
              {isAuthenticated ? (
                <Route path="/app" element={<MainApplication />}>
                  {/* Nested Routes */}
                  <Route index element={<CityList />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/add" element={<Form />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                </Route>
              ) : (
                <Route path="*" element={<Login />} />
              )}

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          )}
        </Suspense>
      </Router>
    </CitiesProvider>
  );
}

// make RootApp component and wrap it with AuthProvider
function RootApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default RootApp;
