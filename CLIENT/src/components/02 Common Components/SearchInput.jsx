import axios from "axios";
import React, { useState } from "react";

const SearchInput = ({ setResponse }) => {
  const [searchString, setSearchString] = useState("");
  const [validSearch, setValidSearch] = useState(true);

  const validate = (e) => {
    const searchString = e.target.value;
    const regex = /^[a-zA-Zą-ž\s\d-]+$/;
    if (searchString === "" || regex.test(searchString)) {
      setSearchString(searchString);
    } else {
      setValidSearch(false);
      setTimeout(() => setValidSearch(true), 500);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/finnhub/company/${searchString}`
      );
      setResponse(response.data);
      console.log(response.data);
    } catch (err) {
      setResponse({});
      alert(err.message);
    }
  };

  return (
    <div className="row mt-4">
      <div className="col-8">
        <input
          type="text"
          className="searchfield "
          onChange={validate}
          value={searchString}
          style={validSearch ? {} : { border: "1px solid red" }}
        ></input>
      </div>
      <div className="col-4">
        {" "}
        <button type="button" className="myBtn1" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
