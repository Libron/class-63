import React, {Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    };

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = parseInt(param[1]);
            } else {
                ingredients[param[0]] = parseInt(param[1]);
            }

            // param = ['cheese', '3']
            ingredients[param[0]] = parseInt(param[1]);
        }

        this.setState({ingredients, price});
    };

    checkoutCancelled = () => {
        this.props.history.goBack();
    };

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <Fragment>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelled}
                    ingredients={this.state.ingredients}
                    checkoutContinued={this.checkoutContinued}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render = {props => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            history={props.history}
                        />
                    )}
                />
            </Fragment>
        );
    }
}

export default Checkout;