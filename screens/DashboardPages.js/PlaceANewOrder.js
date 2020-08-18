import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
//import { Dropdown } from "react-native-material-dropdown";

export default class PlaceANewOrder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    /*let data = [
      {
        value: "Banana",
      },
      {
        value: "Mango",
      },
      {
        value: "Pear",
        <Dropdown label="Favorite Fruit" data={data} />
      },
    ];*/
    return (
      <View>
        <Text style={styles.titleStyle}> Place a New Order </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emailstyle: {
    height: 40,
    margin: 20,
    borderTopWidth: 0,
    borderBottomColor: "black",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    padding: 10,
  },
  passwordstyle: {
    height: 40,
    margin: 20,
    borderTopWidth: 0,
    borderBottomColor: "black",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    padding: 10,
  },
  titleStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
  },
  subheadingStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
});
