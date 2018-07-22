import React, { Component } from 'react';
import Aux from '../../hoc/ReactAux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
// import Spinner from '../../components/UI/Spinner/Spinner';
import Spinner from '../../components/UI/MessagedSpinner/MessagedSpinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 1,
  meat: 3.5,
  bacon: 1.5
}

class BurgerBuilder extends Component {
  /*-------------------------------------Construct*/

  state = {
    ingredients: null,
    totalPrice: 1.5,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }
  /*-------------------------------------Methods*/
  componentDidMount() {
    axios.get('https://react-mkburger.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
        // recalculate price
        let additionalPrice = this.initialPriceCalcHandler(response.data);
        this.setState((prevState) => {
          return {totalPrice: prevState.totalPrice + additionalPrice};
        });
        // set if purchasable
        this.setState({purchasable: additionalPrice > 0});
      })
      .catch(error => {
        this.setState({error: true});
      })
  }
  addIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type]; // get current count
    const updatedCount = oldCount + 1; // increment to count
    const updatedIngredients = {
      ...this.state.ingredients
    }; // get a copy
    updatedIngredients[type] = updatedCount; // mutate copy
    const priceAddition = INGREDIENT_PRICES[type]; // new Item cost
    const oldPrice = this.state.totalPrice; // get old price
    const newPrice = oldPrice + priceAddition; // add to old price
    // set state with new price and the updated ingredient
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);

  }
  removeIngredientHandler = (type) =>{
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1; // decrement count
    const updatedIngredients = {
      ...this.state.ingredients
    }; // get a copy
    updatedIngredients[type] = updatedCount; // mutate copy
    const priceAddition = INGREDIENT_PRICES[type]; // new Item cost
    const oldPrice = this.state.totalPrice; // get old price
    const newPrice = oldPrice - priceAddition; // subtract to old price
    // set state with new price and the updated ingredient
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }
  updatePurchaseState(uptodateIngredients) {
    const sum = Object.keys(uptodateIngredients)
      .map(ingKey => {
        return uptodateIngredients[ingKey]
      }).reduce((sum, el) => {
          return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
  }

  initialPriceCalcHandler = (ingredients) => {
    let price = 0;
    for (const key of Object.keys(ingredients)) {
      price += INGREDIENT_PRICES[key] * this.state.ingredients[key];
    }
    return price;
  }

  purchaseHandler =() => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer:  {
        name: 'Arian Seyedi',
        address: 'Test Street',
        country: 'Canada',
        email: 'arianseyedi@ar.com'
      },
      deliveryMethod: 'uberEats'
    }
    // .json endpoint for firebase to work
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch( error => {
        this.setState({loading: false, purchasing: false});
        console.log(error)
      });
  }

  /*-------------------------------------Render*/
  render() {
    /*----------------disable buttons? info*/
    const disableInfo = {
      ...this.state.ingredients
    }
    // true or false at every key
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null;

    let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner>Please Stand By...</Spinner>

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disable={disableInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}/>
        </Aux>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}/>
      );       
    }
    if (this.state.loading) {
      orderSummary = <Spinner>Placing Your Order...</Spinner>;
    }
    /*----------------return*/
    return (
        <Aux>
            <Modal 
              show={this.state.purchasing} 
              modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
