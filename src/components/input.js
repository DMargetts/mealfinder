import React from "react";

function input(props) {
  return (
    <div className="search">
      <input type="text" onChange={props.input} placeholder="Enter meal" />
      <button onClick={props.outputMeals}>Search</button>
    </div>
  );
}
export default input;
