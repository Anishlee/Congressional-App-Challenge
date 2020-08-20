import React, { Component } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: "",
      typedPassword: "",
      typedName: "",
      typedAddress: "",
      InvalidName: null,
      InvalidAddress: null,
      InvalidUsername: null,
      InvalidPassword: null,
    };
  }
  onPress(Name, Address, Username, Password) {
    if (
      Name.length != 0 &&
      Username.length != 0 &&
      Password.length != 0 &&
      Address.length != 0
    ) {
      this.props.navigation.navigate("LoginPage", {
        Name: Name,
        Address: Address,
        userName: Username,
        password: Password,
      });
      return true;
    } else {
      if (Name.length == 0) {
        this.setState({ InvalidName: "" });
      }
      if (Address.length == 0) {
        this.setState({ InvalidAddress: "" });
      }
      if (Username.length == 0) {
        this.setState({ InvalidUsername: "" });
      }
      if (Password.length == 0) {
        this.setState({ InvalidPassword: "" });
      }
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.titleStyle}> Create an Account </Text>
        <Text style={styles.subheadingStyle}> Enter your Name </Text>
        <TextInput
          placeholder="Please enter your Name"
          placeholderTextColor="#808080"
          keyboardType="email-address"
          style={styles.emailstyle}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedName: text,
                InvalidName: text,
              };
            });
          }}
        />
        {this.state.InvalidName == "" && (
          <Text style={styles.errorText}>Please enter a Name</Text>
        )}
        <Text style={styles.subheadingStyle}> Enter your Address </Text>
        <TextInput
          placeholder="Please enter your Address"
          placeholderTextColor="#808080"
          keyboardType="email-address"
          style={styles.emailstyle}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedAddress: text,
                InvalidAddress: text,
              };
            });
          }}
        />
        {this.state.InvalidAddress == "" && (
          <Text style={styles.errorText}>Please enter a Address</Text>
        )}
        <Text style={styles.subheadingStyle}> Enter a Username or Email </Text>
        <TextInput
          placeholder="Please enter your new username"
          keyboardType="email-address"
          placeholderTextColor="#808080"
          style={styles.emailstyle}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedText: text,
                InvalidUsername: text,
              };
            });
          }}
        />
        {this.state.InvalidUsername == "" && (
          <Text style={styles.errorText}>Please enter a Username</Text>
        )}
        <Text style={styles.subheadingStyle}> Enter a Password</Text>
        <TextInput
          placeholder="Please enter your new password"
          keyboardType="email-address"
          placeholderTextColor="#808080"
          style={styles.passwordstyle}
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedPassword: text,
                InvalidPassword: text,
              };
            });
          }}
        />
        {this.state.InvalidPassword == "" && (
          <Text style={styles.errorText}>Please enter a Password</Text>
        )}
        <Button
          title="Submit"
          onPress={() =>
            this.onPress(
              this.state.typedName,
              this.state.typedAddress,
              this.state.typedText,
              this.state.typedPassword
            )
          }
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
  errorText: {
    color: "red",
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
});
