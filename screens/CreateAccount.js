import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: "",
      typedPassword: "",
    };
  }

  render() {
    return (
      <View>
        <Text style={styles.titleStyle}> Create an Account </Text>
        <Text style={styles.subheadingStyle}> Enter a Username or Email </Text>
        <TextInput
          placeholder="Please enter your new username"
          placeholderTextColor="#808080"
          style={styles.emailstyle}
        />
        <Text style={styles.subheadingStyle}> Enter a Password</Text>
        <TextInput
          placeholder="Please enter your new password"
          placeholderTextColor="#808080"
          style={styles.passwordstyle}
        />
        <Button
          title="Submit"
          onPress={() => this.props.navigation.navigate("HomePage")}
        />
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
});
