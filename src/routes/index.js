import React, { useContext, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRouter from './MainRouter';

export default class Router extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <NavigationContainer>
        <MainRouter />
      </NavigationContainer>
    );
  }

};
