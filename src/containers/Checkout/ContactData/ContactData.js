import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";

import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
      name: '',
      email: '',
      street: '',
      postal: ''
    };

    valueChanged = event => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    };

    orderHandler = event => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {...this.state}
        };

        axios.post('orders.json', order).then(()=>{
            this.props.history.push('/');
        });
    };

    render() {
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    <input className="Input" type="text" name="name" placeholder="Your Name"
                        value={this.state.name} onChange={this.valueChanged}
                    />
                    <input className="Input" type="email" name="email" placeholder="Your Mail"
                        value={this.state.email} onChange={this.valueChanged}
                    />
                    <input className="Input" type="text" name="street" placeholder="Street"
                           value={this.state.street} onChange={this.valueChanged}
                    />
                    <input className="Input" type="text" name="postal" placeholder="Postal Code"
                           value={this.state.postal} onChange={this.valueChanged}
                    />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}



export default ContactData;