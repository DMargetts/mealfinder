import React from "react";

function images(props) {
  if (props.displayInfo === false) {
    return (
      <div style={imageContainer}>
        {props.images.map((image, i) => {
          return (
            <div key={props.images[i]} className="foodItem">
              <h1 style={title} key={props.meal[i]}>
                {props.meal[i]}
              </h1>
              <img
                style={imageSize}
                key={i}
                src={image}
                onClick={props.showInfo}
                alt="food"
              />
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div style={imageContainer}>
          {props.images.map((image, i) => {
            return (
              <div key={props.images[i]} className="foodItem">
                <h1 style={title} key={props.meal[i]}>
                  {props.meal[i]}
                </h1>
                <img
                  style={imageSize}
                  key={i}
                  src={image}
                  onClick={props.showInfo}
                  alt="food"
                />
              </div>
            );
          })}
        </div>
        <div style={container}>
          <h1>{props.meal[props.index]}</h1>
          <img src={props.images[props.index]} />
          <h2>Category</h2>
          <p>{props.category[props.index]}</p>
          <h2>Recipe</h2>
          <ol>
            {props.instructions[props.index].map((step, i) => {
              return <li key={i}>{step}</li>;
            })}
          </ol>
          <h2>Ingredients</h2>
          <ul>
            {props.ingredients[props.index].map((item, i) => {
              return <li key={i}>{item}</li>;
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
const container = {
  display: "flex",
  flexDirection: "column",
  width: "80%",
  marginTop: "10px",
};
const imageContainer = {
  display: "flex",
  flexWrap: "wrap",
  width: "80%",
};
const title = {
  textAlign: "center",
  padding: "5px",
};
const imageSize = {
  margin: "auto",
  height: "200px",
  width: "200px",
};
export default images;
