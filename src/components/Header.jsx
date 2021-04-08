import { FormControl, MenuItem, Select } from "@material-ui/core";
import React from "react";
import "./header.css";

function Header({ countries, country, changeCountry }) {
  

  return (
    <div className="header">
      <h1>COVID-19 Coronavirus Tracker</h1>
      <FormControl>
        <Select variant="outlined" value={country} onChange={changeCountry}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
          {/* <MenuItem value="worldwide">Worldwide</MenuItem>
                    <MenuItem value="UK">UK</MenuItem>
                    <MenuItem value="Nigeria">Nigeria</MenuItem> */}
        </Select>
      </FormControl>
    </div>
  );
}

export default Header;
