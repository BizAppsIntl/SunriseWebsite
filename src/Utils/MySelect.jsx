

import { useState } from "react";
// import "./styles.css";
var data = require("./MOCK_DATA.json");

export default function MySelect() {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  return (
    <div className="AppX">
      <h1>Search</h1>

      <div className="search-container" style={{width: '280px',  display: 'flex',  flexDirection: 'column'}}>
        <div className="d-flex">
          <input type="text" value={value} onChange={onChange} style={{width: '220px'}} />
          <button onClick={() => onSearch(value)}> Search </button>
        </div>
        <div className="dropdown" style={{zIndex:'999', backgroundColor: 'white',  display: 'flex',  flexDirection: 'column',  border: '1px solid gray'}}>
          {data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.full_name.toLowerCase();

              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.full_name)}
                className="dropdown-row" style={{  cursor: 'pointer', textAlign: 'start', margin: '2px 0'}}
                key={item.full_name}
              >
                {item.full_name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

