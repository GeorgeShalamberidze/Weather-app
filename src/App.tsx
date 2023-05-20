import React, { useEffect, useState } from "react";
import Weather from "./interface/Weather";
import Search from "./components/Search";
import { FiSearch } from "react-icons/fi";
import getWeather from "./utils/getWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const [locationInput, setLocationInput] = useState<string | undefined>("");
  const [icon, setIcon] = useState<string | undefined>();
  const [locationNotFound, setLocationNotFound] = useState<boolean>(false);

  const searchForLocation = async (): Promise<void> => {
    const URL: string = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;
    getWeather(setWeatherData, setIcon, setLocationNotFound, URL);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (locationInput !== "") {
      searchForLocation();
      setLocationInput("");
      setLocationNotFound(false);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        const currentLocationURL: string = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

        getWeather(
          setWeatherData,
          setIcon,
          setLocationNotFound,
          currentLocationURL
        );
      }
    );
  }, []);

  return (
    <div className="flex flex-col justify-center items-center app_container w-full m-auto">
      <form onSubmit={handleSubmit} className="w-full pt-2 pb-12 h-20">
        <div className="flex w-full justify-between gap-5">
          <Search
            location={locationInput}
            setLocation={setLocationInput}
            setLocationNotFound={setLocationNotFound}
          />
          <button type="submit">
            <FiSearch size={30} />
          </button>
        </div>
        {locationNotFound && (
          <p className="md:text-lg text-sm text-red-400">Location Not Found</p>
        )}
      </form>
      <div className="w-full">
        {weatherData ? (
          <div className="flex flex-col items-center weather_wrapper">
            <div className="flex items-center justify-center">
              <h1 className="text-xl mr-4 md:text-3xl">
                {weatherData.name}, {weatherData.sys.country}
              </h1>
              <img
                className="w-9"
                src={`https://flagsapi.com/${weatherData.sys.country}/flat/64.png`}
                alt={`${weatherData.sys.country} Flag`}
              />
            </div>
            <img src={icon} alt="current weather condition" />
            <h1 className="text-5xl">
              {weatherData.main.temp.toFixed()}{" "}
              <span className="text-sm">&#176;C</span>
            </h1>
            <br />
            <div className="weather_conditions gap-y-5 gap-x-2">
              <div className="condition">
                <h3 className="text-center">Weather Condition:</h3>
                <p className="text-center">
                  {weatherData.weather[0].main} -{" "}
                  {weatherData.weather[0].description}
                </p>
              </div>

              <div className="condition">
                <h3>Feels Like:</h3>
                <p> {weatherData.main.feels_like.toFixed()} &#176;C</p>
              </div>

              <div className="condition">
                <h3>Humidity: </h3>
                <p>{weatherData.main.humidity}</p>
              </div>

              <div className="condition">
                <h3>Sea Level:</h3>
                <p>
                  {weatherData.main?.sea_level
                    ? weatherData.main?.sea_level
                    : "-"}
                </p>
              </div>

              <div className="condition">
                <h3>Wind Speed:</h3>
                <p>{weatherData.wind.speed}</p>
              </div>

              <div className="condition">
                <h3>Visibility:</h3>
                <p>{weatherData.visibility}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default App;
