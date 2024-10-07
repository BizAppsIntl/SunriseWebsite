import { useState } from "react";
import SelectComponent from "./SelectComponent";
import "./MyDropDownStyles.css";

const options = [
  { key: 1, value: "Test 1" },
  { key: 2, value: "Test 2" },
  { key: 3, value: "Test 3" },
  { key: 4, value: "Test 4" }
];
export default function MyDropDownApp() {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="MyDrpDnApp">
      <h1>Custom Dropdown</h1>
      <SelectComponent
        options={options}
        onChange={(item) => setSelectedOption(item)}
        selectedKey={selectedOption}
        placeholder={"type to search"}
      />
      <p>selected option: {selectedOption}</p>
    </div>
  );
}


