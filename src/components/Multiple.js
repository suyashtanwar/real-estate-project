import React, { useState ,useEffect } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes", value: "grapes" },
  { label: "Mango ", value: "mango" },
  { label: "Strawberry", value: "strawberry", disabled: true }
];

const Example = (props) => {
  const [selected, setSelected] = useState([]);

  
  useEffect(() => {
    props.data.getMultile(selected)
    console.log(selected)
   },()=> {
    setTimeout(() => setSelected, 1000000);});

  return (
    <div >
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        
        // labelledBy="Select"
      />
    </div>
  );
};

export default Example;
