import React from 'react';
import './Ingredient.css';

const Ingredient = props => {
  switch (props.type) {
      case 'bread-top':
          return (
              <div className="BreadTop">
                  <div className="Seeds1" />
                  <div className="Seeds2" />
              </div>
          );
      case 'bread-bottom':
          return <div className="BreadBottom" />;
      case 'meat':
          return <div className="Meat" />;
      case 'cheese':
          return <div className="Cheese" />;
      case 'bacon':
          return <div className="Bacon" />;
      case 'salad':
          return <div className="Salad" />;
      default:
          return null;

  }
};

export default Ingredient;