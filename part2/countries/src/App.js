import React, { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ name, setSearch, setFilter }) => {
  const showHandler = () => {
    setSearch(name)
    setFilter([name])
  }
    return (
        <div>
            <br />
            {name} <button onClick={showHandler}>show</button>
        </div>
    );
};

const Detail = ({ country }) => {
    return(
      <>
      <h1>{country.name.official}</h1>
      <h2>languages</h2>
      <ul>
      {Object.values(country.languages).map((lang) => <li>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt="Flag"/>
      </>
    )
};

const App = () => {
    const [search, setSearch] = useState("");
    const [countries, setCountries] = useState([]);
    const [filter, setFilter] = useState([]);

    const searchHandler = (event) => {
        setSearch(event.target.value);
        setFilter(
            countries
                .map((country) => country.name.common.toLowerCase())
                .filter((country) => country.includes(search.toLowerCase()))
        );
    };

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all").then((response) => {
            setCountries(response.data);
        });
    }, []);

    return (
        <div>
            find countries <input value={search} onChange={searchHandler} />
            <br />
            {filter.length > 10 ? (
                <p>Too many countries, be more specific</p>
            ) : filter.length === 1 ? (
                <Detail country={countries.find(country => country.name.common.toLowerCase().includes(filter))}/>
            ) : (
                filter.map((country) => <Country key={country} name={country} setSearch={setSearch} setFilter={setFilter}/>)
            )}
        </div>
    );
};

export default App;
