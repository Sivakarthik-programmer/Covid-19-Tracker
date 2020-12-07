import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStat, sortData } from "./util";
import "leaflet/dist/leaflet.css";
import numeral from "numeral";
//https://disease.sh/ --> To get all the info related to covid
// BEM naming convention
// componnet_element
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [caseType, setCaseType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          let sortedData = sortData(data);
          setMapCountries(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountries();
  }, []);

  const onCountryChange = async event => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (data.countryInfo) {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        } else {
          setMapCenter([34.80746, -40.4796]);
          setMapZoom(3);
        }
      });
  };

  return (
    <div className="app">
      <div className="app_left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
              <InfoBox isRed active={caseType === 'cases'} onClick={e => setCaseType('cases')} title='Corona cases' cases={prettyPrintStat(countryInfo.todayCases)} Total={prettyPrintStat(countryInfo.cases)} />
              <InfoBox active={caseType === 'recovered'} onClick={e => setCaseType('recovered')} title='Recovered' cases={prettyPrintStat(countryInfo.todayRecovered)} Total={prettyPrintStat(countryInfo.recovered)} />
              <InfoBox isRed active={caseType === 'deaths'} onClick={e => setCaseType('deaths')} title='Deaths' cases={prettyPrintStat(countryInfo.todayDeaths)} Total={prettyPrintStat(countryInfo.deaths)} />
        </div>

        <Map
          countries={mapCountries}
          caseType={caseType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 className="app_graphTitle">Worldwide new {caseType}</h3>
          <LineGraph className="app__graph" casesType={caseType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
