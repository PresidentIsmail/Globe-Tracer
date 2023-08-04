# Globe Tracer

![App Walkthrough](./public/app-walkthrough.gif)

## Introduction

**Globe Tracer** is a web application that allows users to track all the places they have traveled to around the world. With an interactive map and a user-friendly interface, users can easily record their travel experiences and view them at any time.

## Notice

🚨 **Please Note:** This project is **no longer maintained**. While you can still explore its functionality and use it for personal purposes, no further updates or bug fixes will be provided. Feel free to fork the repository and continue its development if you wish.

## Features

- **Interactive Map**: The right side of the screen features an interactive map. Users can click anywhere on the map, and a form will appear on the left side to input details about their visit to that particular city.

- **Data Display**: All the recorded travel locations and details are displayed on the left side. Each entry includes the city name, country, date of visit, notes, and a link to learn more about the city on Wikipedia.

## How to Use

1. Clone this repository to your local machine.
2. Navigate to the project directory and install the dependencies using `npm install`.
3. Start the development server with `npm run dev`. This will run the Vite development server for the React frontend.
4. Open a separate terminal and start the JSON Server API using `npm run server`. This will act as the fake server for the data.
5. Access the app in your web browser at `http://localhost:3000`.

## Data Persistence

Initially, the app uses JSON Server as a fake server to store the data. If you plan to deploy the app, you'll need to set up a proper backend API or use a cloud-based database to handle data persistence. Refer to the "Data Persistence" section in the codebase for more details and alternatives.

## Contributing

contributions are welcome! However, please keep in mind that this project is not actively maintained, so any contributions may not be integrated into the main repository. If you encounter any issues or have ideas for improvements, feel free to submit a pull request.


Enjoy tracking your past travels with Globe Tracer! 🌎✈️
