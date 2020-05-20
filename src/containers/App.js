import React from "react";
import Images from "../components/images";
import Input from "../components/input";
import Random from "../components/random";
import "../style/App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      meal: "",
      images: "",
      category: "",
      instructions: "",
      ingredients: "",
      input: "",
      displayInfo: false,
      index: "",
      mealNotFound: false,
    };
  }
  outputMeals = () => {
    if (this.state.displayInfo === true) {
      this.setState({ displayInfo: false });
      setTimeout(() => this.outputMeals(), 0);
    } else {
      if (this.state.input !== "") {
        fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.state.input}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(this.state.mealNotFound);
            if (data.meals !== null) {
              this.setState({
                mealNotFound: false,
                index: "",
                meal: data.meals.map((meal) => meal.strMeal),
                images: data.meals.map((meal) => meal.strMealThumb),
                category: data.meals.map((meal) => meal.strCategory),
                instructions: data.meals.map((meal) =>
                  meal.strInstructions.match(/[^.]+\./g)
                ),
                ingredients: data.meals.map((meal) => {
                  let ingredientArr = Object.keys(meal).filter((ingredient) =>
                    /strIngredient\d/.test(ingredient)
                  );
                  let map = {};

                  for (let i = 0; i < ingredientArr.length; i++) {
                    if (meal[ingredientArr[i]]) {
                      map[ingredientArr[i]] = meal[ingredientArr[i]];
                    }
                  }
                  return Object.values(map);
                }),
              });
            } else {
              this.setState({ mealNotFound: true });
            }
          });
      } else {
        this.setState({ mealNotFound: true });
      }
    }
  };
  getInput = (e) => {
    this.setState({ input: e.target.value });
  };
  showInfo = (e) => {
    this.setState({ displayInfo: true });
    for (let i = 0; i < this.state.images.length; i++) {
      if (e.target.src === this.state.images[i]) {
        this.setState({ index: i });

        break;
      }
    }
  };
  random = () => {
    if (this.state.displayInfo === true) {
      this.setState({ displayInfo: false });
      setTimeout(() => this.random(), 0);
    } else {
      fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            index: "",
            meal: data.meals.map((meal) => meal.strMeal),
            images: data.meals.map((meal) => meal.strMealThumb),
            category: data.meals.map((meal) => meal.strCategory),
            instructions: data.meals.map((meal) =>
              meal.strInstructions.match(/[^.]+\./g)
            ),
            ingredients: data.meals.map((meal) => {
              let ingredientArr = Object.keys(meal).filter((ingredient) =>
                /strIngredient\d/.test(ingredient)
              );
              let map = {};

              for (let i = 0; i < ingredientArr.length; i++) {
                if (meal[ingredientArr[i]]) {
                  map[ingredientArr[i]] = meal[ingredientArr[i]];
                }
              }
              return Object.values(map);
            }),
          });
        });
    }
  };

  render() {
    if (this.state.images.length > 0) {
      return (
        <div className="App">
          <h1>Meal Finder</h1>
          <Input input={this.getInput} outputMeals={this.outputMeals} />
          <p> {this.state.mealNotFound ? "Meal not found" : ""}</p>
          <Random random={this.random} />

          <Images
            meal={this.state.meal}
            images={this.state.images}
            category={this.state.category}
            instructions={this.state.instructions}
            ingredients={this.state.ingredients}
            displayInfo={this.state.displayInfo}
            showInfo={this.showInfo}
            index={this.state.index}
          />
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Meal Finder</h1>
          <Input input={this.getInput} outputMeals={this.outputMeals} />
          <p> {this.state.mealNotFound ? "Meal not found" : ""}</p>
          <Random random={this.random} />
        </div>
      );
    }
  }
}

export default App;
