import React from 'react';

const FoodList = ({ recommendedFoods, selectedFoods, onFoodSelect, onFoodDelete }) => {
  return (
    <div className="food-list">
      <div className="recommended-foods">
        <h2>Recommended Foods</h2>
        
        <ul className="food-list-container">
          {recommendedFoods.map((food) => (
            <li key={food.name} className="food-item">
              <div className="food-content">
                <img
                  src={`./images/${food.image}`}
                  alt={food.name}
                  className="food-image"
                />
                <div className="food-name">{food.name}</div>
                <button
                  className="select-button"
                  onClick={() => onFoodSelect(food)}
                >
                  Select
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-foods">
        <h2>Selected Foods</h2>
        <ul className="food-list-container">
          {selectedFoods.map((food) => (
            <li key={food.name} className="food-item selected-food-item">
              <div className="food-content">
                <img
                  src={`./images/${food.image}`}
                  alt={food.name}
                  className="food-image"
                />
                <div className="food-name">{food.name}</div>
                <button
                  className="delete-button"
                  onClick={() => onFoodDelete(food)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FoodList;
