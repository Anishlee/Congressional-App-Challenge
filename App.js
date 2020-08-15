import React, { Component } from "react";
import { TextInput, View, Text, StyleSheet, Keyboard } from "react-native";

export default class App extends Component {
  _isMounted = false;
  state = {
    isLoading: true,
  };
  constructor(props) {
    super(props);
    this.Username = React.createRef();
    this.Password = React.createRef();
    this.ExtraInfo = React.createRef();
    this.state = {
      typedText: "please type your text",
      typedPassword: "please type your password",
      typedDescription: "",
      IsKeyboardShown: "",
    };
  }
  componentDidMount() {
    this._isMounted = true;
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        if (this._isMounted) {
          this.setState({ isLoading: false }, () => {
            return { IsKeyboardShown: "Keyboard is shown" };
          });
        }
      }
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (this._isMounted) {
          this.setState({ isLoading: false }, () => {
            return { IsKeyboardShown: "Keyboard is hidden" };
          });
        }
      }
    );
  }
  componentDidUnMount() {
    this._isMounted = false;
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  render() {
    return (
      <View>
        <TextInput
          ref={this.Username}
          style={styles.emailstyle}
          keyboardType="email-address"
          placeholder="Please enter your email"
          placeholderTextColor="black"
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedText: text,
              };
            });
          }}
        />
        <Text style={{ marginLeft: 20 }}> {this.state.typedText} </Text>
        <TextInput
          ref={this.Password}
          style={styles.passwordstyle}
          keyboardType="default"
          placeholder="Please enter your password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedPassword: text,
              };
            });
          }}
        />
        <Text style={{ marginLeft: 20 }}>{this.state.typedPassword}</Text>
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            alignItems: "center",
          }}
        >
          Please type any other things we want to know about you below:-
        </Text>
        <TextInput
          ref={this.ExtraInfo}
          style={styles.MultilineDescriptionStyle}
          multiline={true}
          borderBottomColor="blue"
          borderBottomWidth={1.5}
          borderLeftColor="blue"
          borderLeftWidth={1.5}
          borderRightColor="blue"
          borderRightWidth={1.5}
          borderTopColor="blue"
          borderTopWidth={1.5}
          editable={true}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedDescription: text,
              };
            });
          }}
        />
        <Text
          style={{
            marginTop: 20,
            marginLeft: 20,
            alignItems: "center",
          }}
        >
          {this.state.IsKeyboardShown}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emailstyle: {
    height: 40,
    margin: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginLeft: 20,
  },
  passwordstyle: {
    height: 40,
    margin: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  MultilineDescriptionStyle: {
    height: 100,
    margin: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
});
