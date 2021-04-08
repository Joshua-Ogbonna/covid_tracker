import { Card, CardContent } from "@material-ui/core";
import React from "react";
import "./sidebar.css";

function CaseCountry({ data }) {
  return (
    <Card className="card__element">
      <CardContent>
        <div className="table__data">
          <h3 className="table__detail">Country Report</h3>

          <div className="table__element">
            {data.map((country) => (
              <div className="table__row">
                <td className="country__details">
                  <img
                    src={country.countryInfo.flag}
                    alt="Country's flag"
                    className="flag"
                  />
                  {country.country}
                </td>
                <td className="country__stats"> {Number(country.cases).toLocaleString()} </td>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CaseCountry;
