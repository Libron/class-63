import React from 'react';
import './Burger.css';
import Ingredient from "./Ingredient/Ingredient";

const Burger = ({ingredients}) => {
    let ingredientComponents = [];

    Object.keys(ingredients).forEach(ingredientName => {
            const amount = ingredients[ingredientName];
            for (let i = 0; i < amount; i++) {
                ingredientComponents.push(
                    <Ingredient key={ingredientName + i} type={ingredientName} />
                );
            }
        });

    if (ingredientComponents.length === 0) {
        ingredientComponents = <p>Start adding ingredient</p>;
    }

    return (
        <div className="Burger">
            <Ingredient type="bread-top" />

            {ingredientComponents}

            <Ingredient type="bread-bottom" />
        </div>
    )
};

export default Burger;