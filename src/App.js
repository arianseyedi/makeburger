import React, { Component } from 'react';
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  // state = {
  //   show: true
  // };
  // // Testing whether memory leak problem with the withErrorHandler is solved.
  // componentDidMount() {
  //   setTimeout(()=> {
  //     this.setState({show: false});
  //   }, 5000);
  // }
  // add this line between layout as well :  {this.state.show ? <BurgerBuilder/> : null}

  render() {
    return (
      <div>
          <Layout>
            <BurgerBuilder/>
          </Layout>
      </div>
    );
  }
}

export default App;
