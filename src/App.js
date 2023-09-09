import React, { Component } from 'react';
import './App.css';
import FoodList from './FoodList';
const foods = require('./foods.json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      calorieLimit: '',
      recommendedFoods: [],
      selectedFoods: [],
      calorieSum: 0,
      showAlert: false,
    };
  }

  componentDidMount() {
    this.setState({ recommendedFoods: foods.recommendedFoods });
  }

  handleCalorieLimitChange = (e) => {
    this.setState({ calorieLimit: e.target.value });
  };

  handleRecommendationClick = () => {
    const { calorieLimit } = this.state;
    if (calorieLimit !== '') {
      const recommendedFoods = this.generateRecommendedFoods(calorieLimit);
      this.setState({ recommendedFoods });
    }
  };

  generateRecommendedFoods = (calorieLimit) => {
    const foodsList = foods.recommendedFoods;
    return foodsList.filter((food) => food.calories <= calorieLimit);
  };

  handleFoodSelect = (food) => {
    this.setState((prevState) => ({
      selectedFoods: [...prevState.selectedFoods, food],
      calorieSum: prevState.calorieSum + food.calories,
      showAlert: false,
    }), () => {
      if (this.state.calorieSum > this.state.calorieLimit) {
        this.setState({ showAlert: true });
      }
    });
  };

  handleFoodDelete = (foodToDelete) => {
    this.setState((prevState) => ({
      selectedFoods: prevState.selectedFoods.filter(
        (food) => food !== foodToDelete
      ),
      calorieSum: prevState.calorieSum - foodToDelete.calories,
      showAlert: false,
    }));
  };

  render() {
    const { calorieLimit, recommendedFoods, selectedFoods, calorieSum, showAlert } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Calorie-based Food Recommendation</h1>
        </header>
        <section className="search-section">
          <div className="search-container">
            <label htmlFor="calorieLimit">Enter Calorie Limit:</label>
            <input
              type="number"
              id="calorieLimit"
              value={calorieLimit}
              onChange={this.handleCalorieLimitChange}
              placeholder="e.g., 500"
            />
            <br></br>
            <br></br>
            <button onClick={this.handleRecommendationClick}>Recommend</button>
          </div>
          {showAlert && (
            <div className="limit-exceeded-message">Stay within your calorie limit!</div>
          )}
        </section>
        <section className="food-list-section">
          <br></br>
        <div className="calorie-sum">Total Calories: {calorieSum}</div>
          <FoodList
            recommendedFoods={recommendedFoods}
            selectedFoods={selectedFoods}
            onFoodSelect={this.handleFoodSelect}
            onFoodDelete={this.handleFoodDelete}
          />
          
        </section>
      </div>
    );
  }
}

export default App;
