import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

import Appbar from '../components/Appbar';




class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="app">
        <Header/>
        <div className="app__body">
        <div className="children" >{ this.props.children }</div>
        </div>

      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};


// <Footer />


export default connect()(App);
