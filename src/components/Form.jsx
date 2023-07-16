// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";

// import function that gets location data from lat and lng
import {
  getLocationData,
  getLocationData_Mapbox,
  MAPBOX_API_TOKEN,
} from "../custom-functions/getLatLong";
//  function that gets the country code
import { getCountryCode } from "../custom-functions/getCountryCode";

const Form = () => {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  // get lat and lng from the url params
  const [searchParams] = useSearchParams();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // get lng and lat from the url params in useEffect
  useEffect(() => {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    setLat(lat);
    setLng(lng);
  }, [searchParams]);

  // get location data from lat and lng and update isLoading state only if there is lat and lng
  useEffect(() => {
    const getLocation = async () => {
      if (lat && lng) {
        try {
          setIsLoading(true);
          const { city, countryName, locality } = await getLocationData(
            lat,
            lng
          );
          setCityName(locality || city);
          setCountry(countryName);
          setIsLoading(false);
        } catch (error) {
          console.log(error.message);
          setIsLoading(false);
        }
      }
    };
    getLocation();
  }, [lat, lng]);

  // get country code from country
  useEffect(() => {
    // if country code is already set, return
    if (countryCode) {
      return;
    }

    try {
      const countryCode = getCountryCode(country);
      console.log(`getting country code for ${country}`);
      if (countryCode) {
        setCountryCode(countryCode);
      } else {
        console.log(`No country code found for ${country}`);
      }
    } catch (error) {
      console.log(
        `Error getting country code for ${country}: ${error.message}`
      );
    }
  }, [country, countryCode]);

  const navigate = useNavigate();

  // when user submits the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // get the date in the format yyyy-mm-dd
    const dateFormatted = date.toISOString().split("T")[0];
    // create a new city object and trim " (the)" from the city name if it exists
    const newCity = {
      cityName: cityName.replace(" (the)", ""),
      country,
      date: dateFormatted,
      notes,
      position: {
        lat,
        lng,
      },
    };

    // add the new city to the database
    fetch("http://localhost:4000/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCity),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        // navigate to the city page
        navigate(`/app/cities/${data.id}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // when user clicks on the Back button navigate to the previous page
  const handleBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  // if there is no lat and lng display message
  if (!lat && !lng) {
    return (
      <Message>
        No latitude and longitude found. Please click somewhere on the map.
      </Message>
    );
  }

  // display message if there is no city name
  if (!cityName) {
    return (
      <Message>
        No city name found. Please click somewhere else on the map.
      </Message>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="country">Country</label>
        <input
          id="country"
          onChange={(e) => setCountry(e.target.value)}
          value={country}
        />
        <span className={`${styles.flag} fi fi-${countryCode} `} />
      </div>

      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd-MM-yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button type="back" onClick={handleBack}>
          &larr; Back
        </Button>
      </div>
    </form>
  );
};

export default Form;
