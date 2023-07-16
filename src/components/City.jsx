import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCitiesContext } from "../context/CitiesProvider";

import styles from "./City.module.css";
import Button from "./Button";
import Spinner from "./Spinner";

// import function that gets the country code
import { getCountryCode } from "../custom-functions/getCountryCode";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

// ======= convert useState to useReducer =======
const initialState = {
  city: null,
  isLoading: false,
  countryCode: null,
};

const reducer = (state, action) => {
  // destructuring the action object
  switch (action.type) {
    case "SET_CITY":
      if (!action.payload.countryCode) {
        action.payload.countryCode = getCountryCode(action.payload.country);
      }

      return {
        ...state,
        city: action.payload,
        countryCode: action.payload.countryCode,
      };
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

const City = () => {
  // useParams to get id from url
  const { id } = useParams();
  // use navigate to navigate to the previous page
  const Navigate = useNavigate();
  // implement useReducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // destructure the state object
  const { city, isLoading, countryCode } = state;

  // use async/await to fetch the data from the url inside useEffect
  useEffect(() => {
    const fetchCity = async () => {
      try {
        dispatch({ type: "SET_IS_LOADING", payload: true });
        const response = await fetch(`http://localhost:4000/cities/${id}`);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const city = await response.json();
        dispatch({ type: "SET_CITY", payload: city });
      } catch (error) {
        console.log(error);
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: false });
      }
    };
    fetchCity();
  }, [id]);

  // destructure the city object
  const { cityName, date, notes } = city || {};

  // when user clicks on the Back button navigate to the previous page
  const handleBack = (event) => {
    event.preventDefault();
    Navigate(-1);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span className={` fi fi-${countryCode}`} /> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button type="back" onClick={handleBack}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
};

export default City;
