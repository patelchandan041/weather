import { Button, Paper, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import './weather.css'
import SendIcon from "@material-ui/icons/Send";
import axios from "axios";

const Weather = () => {
  const [value, setValue] = useState("");
  const [temp, settemp] = useState("");
  const [typecity, settypecity] = useState("");
  const [city, setcity] = useState("Delhi");
  const [img, setimg] = useState("");
  const [disc, setdisc] = useState("");

  const citySelect = (e) => {
    e.preventDefault();
    setcity(typecity);
  };
  useEffect(() => {
    axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d4d9dfad203bcd0d516cb14fcb67f625`
    ).then((res) => {
      setValue(res.data);
      settemp(res.data.main);
      setimg(
        `http://openweathermap.org/img/wn/${res.data.weather[0].icon}.png`
      );
      setdisc(res.data.weather[0].description);
    });
  }, [city]);

  return (
    <div>
      <Paper className="paper">
        <form onSubmit={citySelect} className="elementcenter">
          <TextField
            placeholder="type city here"
            value={typecity}
            onChange={(e) => settypecity(e.target.value)}
          />
          <Button type="submit">
            <SendIcon />
          </Button>
        </form>
        <h6 className="fontcss">{value.name}</h6>
        <img src={img} alt="weather icon" className="imgcss" />
        <h6 className="fontcss">{disc}</h6>
        <div className="elementcenter">
          <p>
            Min <br />
            {`${Math.floor(temp.temp_min - 273.15)}° C`}
          </p>
          <h6 className="fontcss">{`${Math.floor(temp.temp - 273.15)}° C`}</h6>
          <p>
            Min <br />
            {`${Math.floor(temp.temp_max - 273.15)}° C`}
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Weather;