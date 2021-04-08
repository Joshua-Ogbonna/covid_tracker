import React, { useEffect, useState } from "react";
import Header from "./Header";
import InfoBox from "./InfoBox";
import "./home.css";
import Sidebar from "./Sidebar";
import Map from "./Map";
import Button from "@material-ui/core/Button";
import Language from "@material-ui/icons/Language";
import PersonAddDisableIcon from "@material-ui/icons/PersonAddDisabled";
import RadioCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import SystemUpdateIcon from "@material-ui/icons/SystemUpdateAlt";
import { prettyPrintStat, sortData } from "../utils";

function Home() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [cases, setCases] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796})
  const [zoomCenter, setZoomCenter] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((response) =>
        response.json().then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            id: country.countryInfo._id,
          }));

          setTableData(sortData(data));
          setCountries(countries);
          setMapCountries(data)
        })
      );
    };

    getCountries();
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then((response) => {
      response.json().then((data) => {
        //   setCountry(data);
        setCases(data);
      });
    });
  }, []);

  const changeCountry = async (e) => {
    let countryCode = e.target.value;

    let url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then((response) => {
      response.json().then((data) => {
        setCountry(countryCode);  
        setCases(data);
        // console.log(data);
        if (countryCode === 'worldwide') {
          setMapCenter([34.80746, -40.4796])
          setZoomCenter(3)
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        }
        setZoomCenter(4)
      });
    });
  };
  return (
    <div className="container-fluid home__section">
      <div className="row">
        <div className="col-lg-8 first__row">
          {/* Header Section */}
          <Header
            country={country}
            countries={countries}
            changeCountry={changeCountry}
          />
          {/* End of Header */}

          {/* InfoBox Section */}

          <div className="info__box container">
            <div className="row">
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6 ">
                    <div className="today__cases">
                      <InfoBox
                        onClick={e => setCasesType('cases')}
                        icon={<Language></Language>}
                        type="Total Cases"
                        total={prettyPrintStat(cases.todayCases)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="death__cases">
                      <InfoBox
                        icon={<PersonAddDisableIcon></PersonAddDisableIcon>}
                        type="Deaths"
                        total={prettyPrintStat(cases.todayDeaths)}
                        onClick={e => setCasesType('deaths')}
                      />
                    </div>
                  </div>

                  <div className="col-lg-6 ">
                    <div className="active__cases">
                      <InfoBox
                        icon={<RadioCheckedIcon></RadioCheckedIcon>}
                        type="Active Cases"
                        total={prettyPrintStat(cases.active)}
                        onClick={e => setCasesType('cases')}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 ">
                    <div className="recovered__cases">
                      <InfoBox
                        icon={<SystemUpdateIcon></SystemUpdateIcon>}
                        type="Recovered Cases "
                        total={prettyPrintStat(cases.todayRecovered)}
                        onClick={(e) => setCasesType('recovered')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="card__div">
                  <InfoBox
                    icon={<Language className="language"></Language>}
                    type="Affected Country"
                    title={cases.country ? cases.country : "Worldwide"}
                    className="content"
                    total={prettyPrintStat(cases.cases)}
                    onClick={e => setCasesType('cases')}
                  />
                  {cases.continent && (
                    <Button variant="outlined">
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="css-i6dzq1"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <circle cx="12" cy="12" r="3" className="ms-5"></circle>
                      </svg>{" "}
                      {cases.continent.toLocaleString()}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* End of InfoBox */}

          {/* Map Section */}
          <Map center={mapCenter} zoom={zoomCenter} countries={mapCountries} casesType={casesType} />
          {/* End of Map */}
        </div>
        <div className="col-lg-4">
          <Sidebar data={tableData} />
        </div>

        {/* End of Sidebar */}
      </div>
    </div>
  );
}

export default Home;
