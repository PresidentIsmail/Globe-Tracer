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
