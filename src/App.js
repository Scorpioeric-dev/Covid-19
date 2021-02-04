import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { InfoBox } from "./Components/InfoBox";
import { Map } from "./Components/Map";
import { Table } from "./Components/Table";
import { sortData } from "./util";
import "./App.css";
import { LineGraph } from "./Components/LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [casesType, setCasesType] = useState("cases");
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  //useEffect() runs a piece of code  based on a given condition

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      {/*AppLeft*/}
      <div className="app_left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* Loop through all the countries and show a dropdown list of the options */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            title="Coronavirus Cases Today"
            cases={numeral(countryInfo.TodayCases).format("0.0a")}
            total={numeral(countryInfo.cases).format("0.0a")}
          />

          <InfoBox
            title="Recovered Today"
            
            cases={numeral(countryInfo.todayRecovered).format("0,0")}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            title="Deaths Today"
            cases={numeral(countryInfo.todayDeaths).format("0.0a")}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
        </CardContent>
        {/*Table*/}
        <Table countries={tableData} />
        <h3>WorldWide new {casesType} </h3>
        <LineGraph />
      </Card>
    </div>
  );
};

export default App;
