import React, {Component} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';

import {store} from './store/store';

import Login from "./src/login"


export default class App extends Component {
  constructor() {
    super();
    this.state = store.getState();
    store.subscribe(() => this.setState(store.getState()));
  }

  componentDidMount() {
    store.dispatch({type:"FETCH_FILMS"});
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={false} backgroundColor={'black'} barStyle={'dark-content'}/>
        <Login/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
