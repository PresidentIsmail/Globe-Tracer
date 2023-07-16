export const MAPBOX_API_TOKEN =
  "pk.eyJ1IjoiaGFwcHlwdXJwbGVtYW5nbyIsImEiOiJjbGozazU4N3kxYmQ5M2hzM2J3dWtsNmppIn0.PtFBCeIU07925PG35dmJWQ";

export async function getLatLong(city, apiKey) {
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const query = encodeURIComponent(city);
  const accessToken = `access_token=${apiKey}`;

  const url = `${baseUrl}${query}.json?${accessToken}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      // Assuming the first feature returned is the most relevant result
      const [longitude, latitude] = data.features[0].center;
      return { latitude, longitude };
    } else {
      throw new Error("City not found.");
    }
  } catch (error) {
    throw new Error(
      "Error fetching data. Please check your API key or try again later."
    );
  }
}

// function that returns a city, country, locality from lat and lng
export async function getLocationData(lat, lng) {
  const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  const query = `latitude=${lat}&longitude=${lng}`;

  const url = `${baseUrl}?${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      const { city, countryName, locality } = data;
      return { city, countryName, locality };
    } else {
      throw new Error("Location not found.");
    }
  } catch (error) {
    throw new Error(
      "Error fetching data. Please check your API key or try again later."
    );
  }
}

export async function getLocationData_Mapbox(lat, lng, accessToken) {
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const query = `${lng},${lat}.json`;
  const accessTokenParam = `access_token=${accessToken}`;

  const url = `${baseUrl}/${query}?${accessTokenParam}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      // The first feature generally contains the most specific location information
      console.log(data);
      const feature = data.features[0];
      const city = feature.text || "";
      const countryName =
        feature.context.find((context) => context.id.includes("country"))
          .text || "";
      const locality =
        feature.context.find((context) => context.id.includes("place")).text ||
        "";

      return { city, countryName, locality };
    } else {
      throw new Error("Location not found.");
    }
  } catch (error) {
    throw new Error(
      "Error fetching data. Please check your API key or try again later."
    );
  }
}


// funtion that return a city and country from lat and lng using Mapbox API
export async function getCityAndCountry_Mapbox(lat, lng, accessToken) {
  const baseUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places";
  const query = `${lng},${lat}.json`;
  const accessTokenParam = `access_token=${accessToken}`;

  const url = `${baseUrl}/${query}?${accessTokenParam}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      // The first feature generally contains the most specific location information
      const feature = data.features[0];
      const city = feature.text || "";
      const countryName =
        feature.context.find((context) => context.id.includes("country"))
          .text || "";

      return { city, countryName };
    } else {
      throw new Error("Location not found.");
    }
  } catch (error) {
    throw new Error(
      "Error fetching data. Please check your API key or try again later."
    );
  }
}
