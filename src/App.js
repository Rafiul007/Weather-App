import axios from "axios";
import { Button } from "react-bootstrap";
import "./App.css";
import {useState } from "react";

function App() {
  const apiKey = "dfe73ae9c881fc9ab4aab82ead1620f8";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL ="https://api.openweathermap.org/data/2.5/weather?q=" +cityName +"&appid=" +apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  return (
    <div className="col-md-12">
      <div className="weather-bg">
        <h1 className="heading">Weather App</h1>

        <div className="col-4 mt-3">
          <input
            className="form-control"
            type="text"
            value={inputCity}
            onChange={handleChangeInput}
          />
        </div>
        <div className="btn-section">
          <Button className="btn btn-primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      {Object.keys(data).length > 0 && (
        <div className="col-md-12 text-center mt-5">
          <div className="shadow rounded wetherResultBox">
            <img
              className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png"/>

            <h5 className="weathorCity">{data?.name}</h5>
            <h6 className="weathorTemp">
              {(data?.main?.temp - 273.15).toFixed(2)}°C
            </h6>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
