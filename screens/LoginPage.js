import React, { Component } from "react";
import { TextInput, View, Text, StyleSheet, Button, Modal } from "react-native";

import Credentials from "../Database/sampledatabase";
export default class LoginPage extends Component {
  state = {
    isLoading: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      typedText: "",
      typedPassword: "",
      newUser: false,
      modalVisible: false,
      UserName: null,
      PassWord: null,
      userNameError: null,
      passWordError: null,
      userNameAndPasswordError: null,
      inValidUser: null,
    };
  }
  toggleModal(visible) {
    this.setState({ modalVisible: visible });
  }
  checkForCredentials(Username, Password) {
    let UserName = this.state.UserName;
    let PassWord = this.state.PassWord;
    if (Password == "" && Username == "") {
      this.setState({ UserName: "", PassWord: "" });
    } else if (Password == "") {
      this.setState({ PassWord: "" });
    } else if (Username == "") {
      this.setState({ UserName: "" });
    } else {
      const searchCredentials = Credentials.filter((item) => {
        return Username == item.userName && Password == item.password;
      });
      if (searchCredentials.length == 0) {
        this.setState({ inValidUser: "" });
      } else {
        this.props.navigation.navigate("HomePage");
        return true;
      }
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.titleStyle}>Login</Text>
        <Text style={styles.subheadingStyle}>Username</Text>
        <TextInput
          style={styles.emailstyle}
          keyboardType="email-address"
          placeholder="Please enter your email"
          placeholderTextColor="#808080"
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedText: text,
                UserName: text,
                inValidUser: undefined,
                //userNameAndPasswordError: text,
                //userNameError: text,
              };
            });
          }}
        />
        {this.state.UserName === "" && (
          <Text style={styles.errorText}>Please enter a Username</Text>
        )}
        {this.state.inValidUser === "" && (
          <Text style={styles.errorText}>Your credentials are incorrect</Text>
        )}
        <Text style={styles.subheadingStyle}>Password</Text>
        <TextInput
          style={styles.passwordstyle}
          keyboardType="default"
          placeholder="Please enter your password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedPassword: text,
                PassWord: text,
                inValidUser: undefined,
                //userNameAndPasswordError: text,
                //passWordError: text,
              };
            });
          }}
        />
        {this.state.PassWord === "" && (
          <Text style={styles.errorText}>Please enter a Password</Text>
        )}
        {this.state.inValidUser === "" && (
          <Text style={styles.errorText}>Your credentials are incorrect</Text>
        )}
        <Button
          title="Submit"
          onPress={() =>
            this.checkForCredentials(
              this.state.typedText,
              this.state.typedPassword
            )
          }
        ></Button>
        <View style={styles.ButtonContainer}>
          <Text style={{ fontSize: 18, marginRight: 10 }}> New to app? </Text>
          <Button
            title="Create an account"
            onPress={() => this.props.navigation.navigate("CreateAccount")}
          />
        </View>
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
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    alignItems: "center",
    marginLeft: 80,
  },
  errorText: {
    color: "red",
    marginTop: -1,
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
});
