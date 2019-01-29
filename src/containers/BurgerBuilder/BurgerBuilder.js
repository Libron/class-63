import React, {Component, Fragment} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
    meat: 50,
    salad: 5,
    cheese: 20,
    bacon: 30
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 20,
        purchasable: false,
        purchasing: false
    };

    constructor(props){
        super(props);
        console.log(props);
    };

    addIngredientHandler = type => {
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {...this.state.ingredients};
      updatedIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;

      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) return;

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    updatePurchaseState = updatedIngredients => {
      const count = Object.values(updatedIngredients).reduce((sum, value) => sum + value, 0);
        this.setState({purchasable: count > 0});
    };

    purchase = () => {
        this.setState({purchasing: true});
    };

    purchaseCancel = () => {
      this.setState({purchasing: false});
    };

    purchaseContinue = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '='
                + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price='+this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

  render() {

      const disabledInfo = {...this.state.ingredients};
      for (let key in disabledInfo) {
          disabledInfo[key] = disabledInfo[key] === 0;
      }

    return (
      <Fragment>
          <Modal show = {this.state.purchasing}
                 close = {this.purchaseCancel}
          >
              <OrderSummary
                ingredients = {this.state.ingredients}
                price = {this.state.totalPrice}
                purchaseContinue = {this.purchaseContinue}
                purchaseCancel = {this.purchaseCancel}
              />
          </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
            price = {this.state.totalPrice}
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved = {this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            purchasable={this.state.purchasable}
            purchase = {this.purchase}
        />
      </Fragment>
    )
  }
}

export default BurgerBuilder;
