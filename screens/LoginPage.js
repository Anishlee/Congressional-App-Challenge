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
        if (Username) {
          this.setState({ userNameError: "" });
          this.setState({ passWordError: "" });
        } else if (Username) {
          this.setState({ userNameError: "" });
        } else {
          this.setState({ passWordError: "" });
        }
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
                //userNameAndPasswordError: text,
                //userNameError: text,
              };
            });
          }}
        />
        {this.state.UserName === "" && (
          <Text style={styles.errorText}>Please enter a Username</Text>
        )}
        {this.state.userNameError === "" && this.state.userName != "" && (
          <Text style={styles.errorText}>
            You have entered your username incorrectly
          </Text>
        )}
        {this.state.userNameAndPasswordError === "" &&
          this.state.passWordError === "" &&
          this.state.userNameError === "" && (
            <Text style={styles.errorText}>
              You have entered your username incorrectly
            </Text>
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
                //userNameAndPasswordError: text,
                //passWordError: text,
              };
            });
          }}
        />
        {this.state.PassWord === "" && (
          <Text style={styles.errorText}>Please enter a Password</Text>
        )}
        {this.state.passWordError === "" && this.state.PassWord != "" && (
          <Text style={styles.errorText}>
            You have entered your password incorrectly
          </Text>
        )}
        {this.state.userNameAndPasswordError === "" &&
          this.state.passWordError === "" &&
          this.state.userNameError === "" && (
            <Text style={styles.errorText}>
              You have entered your password incorrectly
            </Text>
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
        <Modal visible={this.state.modalVisible}>
          <View>
            <Text style={styles.Text}>
              You have typed either the username or password wrong. Are you a
              new user?
            </Text>
            <View style={styles.ButtonContainer}>
              <Button
                title="YES"
                color="blue"
                onPress={() => {
                  this.props.navigation.navigate("CreateAccount");
                  this.toggleModal(!this.state.modalVisible);
                }}
              />
              <Button
                title="NO"
                color="red"
                onPress={() => {
                  this.toggleModal(!this.state.modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>
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
  modalContainer: {
    justifyContent: "center",
    backgroundColor: "grey",
    margin: 0,
  },
  Text: {
    marginTop: 300,
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    alignItems: "center",
    marginLeft: 75,
  },
  errorText: {
    color: "red",
    marginTop: -1,
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
});
