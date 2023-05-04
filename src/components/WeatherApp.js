// Import the necessary React libraries and your API key
import React, { useState, useEffect } from 'react';
import { API_KEY } from '../config';

// Create a functional component called WeatherApp
const WeatherApp = () => {
  // Declare a state variable called weatherData and initialize it with null
  // setWeatherData is a function that will be used to update the weatherData state
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Define an async function called fetchWeatherData that takes a location as its argument
  const fetchWeatherData = async (location) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
  
      if (data.cod !== 200) {
        setErrorMessage(data.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Error fetching weather data. Please try again later.');
      setWeatherData(null);
    }
  };
  

    // Call the useEffect hook to fetch weather data when the component mounts
    // The empty array [] as the second argument ensures this effect only runs once
    useEffect(() => {
      fetchWeatherData('New York');
    }, []);
      
  // Return the JSX to render the weather data or a loading message
  return (
    <div>
      {errorMessage ? (
        <p>{errorMessage}</p>
      ) : weatherData ? (
        // If weatherData is not null, display the weather information
        <div>
          <h1>{weatherData.name}</h1>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Weather condition: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        // If weatherData is null, display a loading message
        <p>Loading...</p>
      )}
    </div>
  );
};

// Export the WeatherApp component so it can be used in other parts of the application
export default WeatherApp;
