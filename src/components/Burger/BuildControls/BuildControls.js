import React from 'react';
import './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";

const ingredientTypes = ['salad', 'bacon', 'cheese', 'meat'];
const BuildControls = props => {
    return (
      <div className="BuildControls">
          <p>Current price: <strong>{props.price} KGS</strong></p>
          {ingredientTypes.map(type => (
              <BuildControl
                  key={type}
                  type={type}
                  added={() => props.ingredientAdded(type)}
                  removed={() => props.ingredientRemoved(type)}
                  disabled={props.disabledInfo[type]}
              />
          ))}
          <button className="OrderButton" disabled={!props.purchasable} onClick={props.purchase}>ORDER NOW</button>
      </div>
    );
};

export default BuildControls;