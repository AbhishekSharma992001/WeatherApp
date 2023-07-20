import { useEffect, useState } from "react";
import "./styles/app.scss";

function App() {
  const [searchValue, setSearchValue] = useState("palghar");
  const [weatherState, setWeatherState] = useState("");
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.weatherapi.com/v1/forecast.json?key=6c2fb7b2d9db4aa3bf0124550230606&q=${searchValue}&days=3&aqi=no&alerts=no`;
      const response = await fetch(url);
      const data = await response.json();
      const {
        current: {
          condition: { icon, text },
          cloud,
          feelslike_c,
          humidity,
          uv,
          vis_km,
          temp_c,
        },
        forecast: {
          forecastday: {
            0: {
              date: today_date,
              day: {
                avgtemp_c: today_temp,
                condition: { text: today_weather },
              },
            },
            1: {
              date: tomm_date,
              day: {
                avgtemp_c: tomm_temp,
                condition: { text: tomm_weather },
              },
            },
            2: {
              date: aftomm_date,
              day: {
                avgtemp_c: aftomm_temp,
                condition: { text: aftomm_weather },
              },
            },
          },
        },
        location: { country, name, region, localtime },
      } = data;
      const exactTime = localtime.split(" ")[1];
      const exactDate = localtime.split(" ")[0];
      const exactDay = getDayFullName(new Date(exactDate).getDay());
      function getDayFullName(num) {
        switch (num) {
          case 0:
            return "Sunday";

          case 1:
            return "Monday";

          case 2:
            return "Tuesday";

          case 3:
            return "Wednesday";

          case 4:
            return "Thursday";

          case 5:
            return "Friday";

          case 6:
            return "Saturdat";

          default:
            return "Don't Know";
        }
      }
      const currentInfo = {
        exactDate,
        exactTime,
        exactDay,
        localtime,
        today_date,
        today_temp,
        today_weather,
        tomm_date,
        tomm_temp,
        tomm_weather,
        aftomm_date,
        aftomm_temp,
        aftomm_weather,
        humidity,
        text,
        uv,
        vis_km,
        temp_c,
        cloud,
        name,
        icon,
        country,
        region,
        feelslike_c,
      };

      setWeatherState(currentInfo);
    } catch (error) {
      console.log("error fetching data from server, Please try later");
    }
  };

  useEffect(() => {
    getWeatherInfo();
  });
  return (
    <>
      <div id="weather">
        <section>
          <div>
            <h3>forecast</h3>
          </div>
          <div>
            <h3>
              Current Location <br /> {weatherState.name} -
              {weatherState.region} - {weatherState.country}
            </h3>
          </div>
          <div>
            <input
              type={"search"}
              placeholder="Enter location"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          {/* <button type="submit" onClick={getWeatherInfo}>
            search
          </button> */}
        </section>
        <section>
          <h1>Weather</h1>
          <h5>Today</h5>
          <div>
            <div>
              <h3>{weatherState.temp_c}°C</h3>
              <h2>{weatherState.text}</h2>
              <img alt="pic" src={weatherState.icon} />
              <h1>
                {weatherState.exactDay} - {" "}
                {weatherState.exactDate}
              </h1>
            </div>
            <div>
              <h1>RealFeel: {weatherState.feelslike_c}°C</h1>
              <h1>Humidity: {weatherState.humidity}%</h1>
              <h1>UV index: {weatherState.uv}</h1>
              <h1>Cloud Cover: {weatherState.cloud}%</h1>
              <h1>Visibility: {weatherState.vis_km}km</h1>
            </div>
          </div>
          <aside>
            <h3>forecast</h3>

            <div>
              <div>
                <h1>{weatherState.today_temp}°C</h1>
                <h1>{weatherState.today_weather}</h1>
                <h1>{weatherState.today_date}</h1>
              </div>
              <div>
                <h1>{weatherState.tomm_temp}°C</h1>
                <h1>{weatherState.tomm_weather}</h1>
                <h1>{weatherState.tomm_date}</h1>
              </div>
              <div>
                <h1>{weatherState.aftomm_temp}°C</h1>
                <h1>{weatherState.aftomm_weather}</h1>
                <h1>{weatherState.aftomm_date}</h1>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </>
  );
}

export default App;

// https://api.openweathermap.org/data/2.5/weather?q=palghar&units=metric&appid=9bc3b119866cb78592a25f73fd01f729
