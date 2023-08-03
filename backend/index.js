import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import serverless from "serverless-http";

const app = express();
export const handler = serverless(app);
const port = 4000; // Choose a port for your backend API

// Sample cities data to simulate JSON Server behavior
let cities = [
  {
    cityName: "Madrid",
    country: "Spain",
    date: "2027-07-15T08:22:53.976Z",
    notes: "",
    position: {
      lat: 40.416705,
      lng: -3.703583,
    },
    id: 17806751,
  },
  {
    cityName: "Berlin",
    country: "Germany",
    date: "2027-02-12T09:24:11.863Z",
    notes: "Amazing 😃",
    position: {
      lat: 52.5170365,
      lng: 13.3888599,
    },
    id: 98443197,
  },
  {
    cityName: "Paris",
    country: "France",
    date: "2028-03-02T18:45:22.480Z",
    notes: "Enjoyed the food!",
    position: {
      lat: 48.8534951,
      lng: 2.3483915,
    },
    id: 56340192,
  },
  {
    cityName: "Spitsbergen",
    country: "Norway",
    date: "2023-07-16",
    notes: "test",
    position: {
      lat: "78.80197997387756",
      lng: "18.281250000000004",
    },
    id: 98443198,
  },
  {
    cityName: "Kiboga",
    country: "Uganda",
    date: "2023-07-16",
    notes: "test",
    position: {
      lat: "0.7909904981540058",
      lng: "32.16796875000001",
    },
    id: 98443199,
  },
];

// Middleware
// Allow requests from localhost and https://globe-tracer.netlify.app
app.use(
  cors({
    origin: ["http://localhost:3000", "https://globe-tracer.netlify.app"],
  })
);
app.use(bodyParser.json());

// Routes
app.get("/cities", (req, res) => {
  res.json(cities);
});

app.get("/cities/:id", (req, res) => {
  const cityId = parseInt(req.params.id);
  const city = cities.find((city) => city.id === cityId);
  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }
  res.json(city);
});

app.post("/cities", (req, res) => {
  const newCity = req.body;
  newCity.id = cities.length + 1;
  cities.push(newCity);
  res.status(201).json(newCity);
});

app.put("/cities/:id", (req, res) => {
  const cityId = parseInt(req.params.id);
  const updatedCity = req.body;
  const index = cities.findIndex((city) => city.id === cityId);
  if (index === -1) {
    return res.status(404).json({ error: "City not found" });
  }
  cities[index] = { ...cities[index], ...updatedCity };
  res.json(cities[index]);
});

app.delete("/cities/:id", (req, res) => {
  const cityId = parseInt(req.params.id);
  cities = cities.filter((city) => city.id !== cityId);
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
