// import React, { useState, useEffect } from "react";
// import "./App.css";
// import {
//   MenuItem,
//   FormControl,
//   Select,
//   Card,
//   CardContent,
// } from "@material-ui/core";
// import { InfoBox } from "./Components/InfoBox";
// import { Map } from "./Components/Map";
// import { Table } from "./Components/Table";
// import { sortData, prettyPrintStat } from "./util";
// import { LineGraph } from "./Components/LineGraph";
// import "leaflet/dist/leaflet.css";
// import numeral from "numeral";

// const App = () => {
//   const [countries, setCountries] = useState([]);
//   const [country, setCountry] = useState("worldwide");
//   const [countryInfo, setCountryInfo] = useState({});
//   const [casesType, setCasesType] = useState("cases");
//   const [tableData, setTableData] = useState([]);
//   const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
//   const [mapZoom, setMapZoom] = useState(3);
//   const [mapCountries, setMapCountries] = useState([]);

//   //useEffect() runs a piece of code  based on a given condition

//   useEffect(() => {
//     fetch("https://disease.sh/v3/covid-19/all")
//       .then((response) => response.json())
//       .then((data) => {
//         setCountryInfo(data);
//       });
//   }, []);

//   useEffect(() => {
//     const getCountriesData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/countries")
//         .then((response) => response.json())
//         .then((data) => {
//           const countries = data.map((country) => ({
//             name: country.country,
//             value: country.countryInfo.iso2,
//           }));
//           let sortedData = sortData(data);
//           setCountries(countries);
//           setMapCountries(data);
//           setTableData(sortedData);
//         });
//     };
//     getCountriesData();
//   }, []);

// console.log(casesType)

//   const onCountryChange = async (e) => {
//     const countryCode = e.target.value;
//     // setCountry(countryCode);

//     const url =
//       countryCode === "worldwide"
//         ? "https://disease.sh/v3/covid-19/all"
//         : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

//     await fetch(url)
//       .then((response) => response.json())
//       .then((data) => {
//         setCountry(countryCode);
//         setCountryInfo(data);
//         setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
//         setMapZoom(4);
//       });
//   };
//   console.log("CountryInfo >>>");
//   console.log("CountryInfo >>>", countryInfo);
//   return (
//     <div className="app">
//       {/*AppLeft*/}
//       <div className="app_left">
//         <div className="app__header">
//           <h1>COVID-19 TRACKER</h1>
//           <FormControl className="app_dropdown">
//             <Select
//               variant="outlined"
//               value={country}
//               onChange={onCountryChange}
//             >
//               {/* Loop through all the countries and show a dropdown list of the options */}
//               <MenuItem value="worldwide">Worldwide</MenuItem>
//               {countries.map((country) => (
//                 <MenuItem value={country.value}>{country.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>

//         <div className="app_stats">
//           <InfoBox
//             onClick={(e) => setCasesType("cases")}
//             title="Coronavirus Cases Today"
//             is
//             Red
//             active={casesType === "cases"}
//             cases={prettyPrintStat(countryInfo.todayCases)}
//             total={numeral(countryInfo.cases).format("0.0a")}
//           />

//           <InfoBox
//             active={casesType === "recovered"}
//             onClick={(e) => setCasesType("recovered")}
//             title="Recovered Today"
//             cases={prettyPrintStat(countryInfo.todayRecovered)}
//             total={numeral(countryInfo.recovered).format("0.0a")}
//           />
//           <InfoBox
//             active={casesType === "deaths"}
//             onClick={(e) => setCasesType("deaths")}
//             title="Deaths Today"
//             cases={prettyPrintStat(countryInfo.todayDeaths)}
//             total={numeral(countryInfo.deaths).format("0.0a")}
//           />
//         </div>
//         <Map
//           casesType={casesType}
//           center={mapCenter}
//           zoom={mapZoom}
//           countries={mapCountries}
//         />
//       </div>
//       <Card className="app_right">
//         <CardContent>
//           <h3>Live Cases by Country</h3>
//         </CardContent>
//         {/*Table*/}
//         <Table countries={tableData} />
//         <h3>WorldWide new {casesType} </h3>
//         <LineGraph />
//       </Card>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import  InfoBox  from "./Components/InfoBox";
import { Map }  from "./Components/Map";
import { Table } from "./Components/Table";
import { sortData, prettyPrintStat } from "./util";
import { LineGraph } from "./Components/LineGraph";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";

const App = () => {
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setMapCountries(data);
          setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  // console.log(casesType);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };
  console.log('Checkout Info', countryInfo)

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide"><strong>Worldwide</strong></MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}><strong>{country.name}</strong></MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases Today"
            isRed
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered Today"
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Today Deaths"
            isRed
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
