import React from "react";

function random(props) {
  return (
    <button style={margin} onClick={props.random}>
      Random
    </button>
  );
}
const margin = {
  margin: "10px",
};
export default random;
