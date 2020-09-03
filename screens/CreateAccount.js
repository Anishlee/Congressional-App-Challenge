import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
export default class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typedText: "",
      typedPassword: "",
      typedName: "",
      typedAddress: "",
      typedPhoneNumber: "",
      UserOrVolunteer: "",
      InvalidName: null,
      InvalidAddress: null,
      InvalidUsername: null,
      InvalidPassword: null,
      InvalidPhoneNumber: null,
      InvalidUserType: null,
      nonNumericPhoneNumber: null,
    };
  }
  onPress(Name, Address, Username, Password, PhoneNumber, UserType) {
    if (
      Name.length != 0 &&
      Username.length != 0 &&
      Password.length != 0 &&
      Address.length != 0 &&
      PhoneNumber.length != 0 &&
      UserType != 0
    ) {
      fetch("http://localhost:8080/mongo/insertOrUpdateUser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          address: Address,
          username: Username,
          password: Password,
          phonenumber: PhoneNumber,
          usertype: UserType,
        }),
      });
      this.props.navigation.navigate("LoginPage");
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
      if (PhoneNumber.length == 0) {
        this.setState({ InvalidPhoneNumber: "" });
      }
      if (UserType.length == 0) {
        this.setState({ InvalidUserType: "" });
      }
      if (PhoneNumber.match(/^[a-zA-Z]+$/) && PhoneNumber.length != 0) {
        this.setState({ nonNumericPhoneNumber: "" });
      }
    }
  }
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        enabled
      >
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss();
            }}
          >
            <View>
              <Text style={styles.titleStyle}> Create an Account </Text>
              <Text style={styles.subheadingStyle}>
                {" "}
                Are you signing up to be a user or a volunteer?
              </Text>
              <DropDownPicker
                items={[
                  {
                    label: "Volunteer",
                    value: "volunteer",
                  },
                  {
                    label: "User",
                    value: "user",
                  },
                ]}
                placeholder="Please choose a option below"
                containerStyle={{ height: 60 }}
                style={({ backgroundColor: "#fafafa" }, { marginTop: 10 })}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={
                  ({ backgroundColor: "#fafafa" }, { marginTop: 10 })
                }
                onChangeItem={(item) =>
                  this.setState({
                    UserOrVolunteer: item.value,
                    InvalidUserType: item.value,
                  })
                }
              />
              {this.state.InvalidUserType == "" && (
                <Text style={styles.errorText2}>
                  Please choose either User or Volunteer
                </Text>
              )}
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
              <Text style={styles.subheadingStyle}>
                {" "}
                Enter a Username or Email{" "}
              </Text>
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
              <Text style={styles.subheadingStyle}> Enter a Phone Number</Text>
              <TextInput
                placeholder="Please enter your phone number (please don't enter dashes)"
                keyboardType="email-address"
                placeholderTextColor="#808080"
                style={styles.passwordstyle}
                onChangeText={(text) => {
                  this.setState((previousState) => {
                    return {
                      typedPhoneNumber: text,
                      InvalidPhoneNumber: text,
                      nonNumericPhoneNumber: text,
                    };
                  });
                }}
              />
              {this.state.InvalidPhoneNumber == "" && (
                <Text style={styles.errorText}>
                  Please enter a Phone Number
                </Text>
              )}
              {this.state.nonNumericPhoneNumber == "" && (
                <Text style={styles.errorText}>
                  Please enter only a numeric value (dashes aren't necessary)
                </Text>
              )}
              <Button
                title="Submit"
                onPress={() =>
                  this.onPress(
                    this.state.typedName,
                    this.state.typedAddress,
                    this.state.typedText,
                    this.state.typedPassword,
                    this.state.typedPhoneNumber,
                    this.state.UserOrVolunteer
                  )
                }
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
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
  errorText2: {
    color: "red",
    marginLeft: 1,
    fontSize: 15,
    marginBottom: 10,
  },
});
