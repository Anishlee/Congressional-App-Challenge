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
      typedZipCode: "",
      typedCity: "",
      typedState: "",
      typedPhoneNumber: "",
      UserOrVolunteer: "",
      InvalidName: null,
      InvalidAddress: null,
      InvalidCity: null,
      InvalidZipCode: null,
      InvalidState: null,
      InvalidUsername: null,
      InvalidPassword: null,
      InvalidPhoneNumber: null,
      InvalidUserType: null,
      nonNumericPhoneNumber: null,
    };
  }
  onPress(
    Name,
    StreetAddress,
    CityLocation,
    State,
    ZipCode,
    Username,
    Password,
    PhoneNumber,
    UserType
  ) {
    if (
      Name.length != 0 &&
      Username.length != 0 &&
      Password.length != 0 &&
      StreetAddress.length != 0 &&
      CityLocation != 0 &&
      State != 0 &&
      ZipCode != 0 &&
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
          address: StreetAddress,
          city: CityLocation,
          state: State,
          zipcode: ZipCode,
          username: Username,
          password: Password,
          phonenumber: PhoneNumber,
          usertype: UserType,
        }),
      });
      this.props.navigation.navigate("Login");
      console.log("hi");
      return true;
    } else {
      if (Name.length == 0) {
        this.setState({ InvalidName: "" });
      }
      if (StreetAddress.length == 0) {
        this.setState({ InvalidAddress: "" });
      }
      if (CityLocation.length == 0) {
        this.setState({ InvalidCity: "" });
      }
      if (State.length == 0) {
        this.setState({ InvalidState: "" });
      }
      if (ZipCode.length == 0) {
        this.setState({ InvalidZipCode: "" });
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
            <View style={{ backgroundColor: "#f0ffff" }}>
              <Text style={styles.titleStyle}>
                {" "}
                Create
                <Text style={styles.titleStyle2}> an </Text>
                <Text style={styles.titleStyle}>Account </Text>
              </Text>
              <Text style={styles.subheadingStyle}> User or Volunteer?</Text>
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
                containerStyle={{
                  height: 60,
                  textAlign: "center",
                  marginBottom: 15,
                  marginLeft: 20,
                  marginRight: 20,
                }}
                style={({ backgroundColor: "#fafafa" }, { marginTop: 10 })}
                itemStyle={{
                  justifyContent: "center",
                }}
                labelStyle={{
                  textAlign: "center",
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

              <Text style={styles.subheadingStyle2}> Enter your Name </Text>
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
                placeholder="Please enter your Street Address"
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
              <TextInput
                placeholder="Please enter your City Location"
                placeholderTextColor="#808080"
                keyboardType="email-address"
                style={styles.emailstyle}
                onChangeText={(text) => {
                  this.setState((previousState) => {
                    return {
                      typedCity: text,
                      InvalidCity: text,
                    };
                  });
                }}
              />
              {this.state.InvalidCity == "" && (
                <Text style={styles.errorText}>Please type a City</Text>
              )}
              <DropDownPicker
                items={[
                  {
                    label: "AL",
                    value: "AL",
                  },
                  {
                    label: "AK",
                    value: "AK",
                  },
                  {
                    label: "AZ",
                    value: "AZ",
                  },
                  {
                    label: "AR",
                    value: "AR",
                  },
                  {
                    label: "CA",
                    value: "CA",
                  },
                  {
                    label: "CO",
                    value: "CO",
                  },
                  {
                    label: "CT",
                    value: "CT",
                  },
                  {
                    label: "DE",
                    value: "DE",
                  },
                  {
                    label: "FL",
                    value: "FL",
                  },
                  {
                    label: "GA",
                    value: "GA",
                  },
                  {
                    label: "HI",
                    value: "HI",
                  },
                  {
                    label: "ID",
                    value: "ID",
                  },
                  {
                    label: "IL",
                    value: "IL",
                  },
                  {
                    label: "IN",
                    value: "IN",
                  },
                  {
                    label: "IA",
                    value: "IA",
                  },
                  {
                    label: "KS",
                    value: "KS",
                  },
                  {
                    label: "KY",
                    value: "KY",
                  },
                  {
                    label: "LA",
                    value: "LA",
                  },
                  {
                    label: "ME",
                    value: "ME",
                  },
                  {
                    label: "MD",
                    value: "MD",
                  },
                  {
                    label: "MI",
                    value: "MI",
                  },
                  {
                    label: "MN",
                    value: "MN",
                  },
                  {
                    label: "MS",
                    value: "MS",
                  },
                  {
                    label: "MO",
                    value: "MO",
                  },
                  {
                    label: "MT",
                    value: "MT",
                  },
                  {
                    label: "NE",
                    value: "NE",
                  },
                  {
                    label: "NV",
                    value: "NV",
                  },
                  {
                    label: "NH",
                    value: "NH",
                  },
                  {
                    label: "NJ",
                    value: "NJ",
                  },
                  {
                    label: "NM",
                    value: "NM",
                  },
                  {
                    label: "NY",
                    value: "NY",
                  },
                  {
                    label: "NC",
                    value: "NC",
                  },
                  {
                    label: "ND",
                    value: "ND",
                  },
                  {
                    label: "OH",
                    value: "OH",
                  },
                  {
                    label: "OK",
                    value: "OK",
                  },
                  {
                    label: "OR",
                    value: "OR",
                  },
                  {
                    label: "PA",
                    value: "PA",
                  },
                  {
                    label: "RI",
                    value: "RI",
                  },
                  {
                    label: "SC",
                    value: "SC",
                  },
                  {
                    label: "SD",
                    value: "SD",
                  },
                  {
                    label: "TN",
                    value: "TN",
                  },
                  {
                    label: "TX",
                    value: "TX",
                  },
                  {
                    label: "UT",
                    value: "UT",
                  },
                  {
                    label: "VT",
                    value: "VT",
                  },
                  {
                    label: "VA",
                    value: "VA",
                  },
                  {
                    label: "WA",
                    value: "WA",
                  },
                  {
                    label: "WV",
                    value: "WV",
                  },
                  {
                    label: "WI",
                    value: "WI",
                  },
                  {
                    label: "WY",
                    value: "WY",
                  },
                ]}
                placeholder="Please choose a state below"
                containerStyle={{
                  height: 50,
                  textAlign: "center",
                  marginLeft: 20,
                  marginRight: 20,
                }}
                style={({ marginTop: 10 }, { marginBottom: 0 })}
                itemStyle={{
                  justifyContent: "center",
                }}
                dropDownStyle={({ marginTop: 10 }, { marginBottom: 0 })}
                labelStyle={{
                  textAlign: "center",
                }}
                onChangeItem={(item) =>
                  this.setState({
                    typedState: item.value,
                    InvalidState: item.value,
                  })
                }
              />
              {this.state.InvalidState == "" && (
                <Text style={styles.errorText}>
                  Please choose one of the states listed
                </Text>
              )}
              <TextInput
                placeholder="Please enter your Zip Code"
                placeholderTextColor="#808080"
                keyboardType="email-address"
                style={styles.emailstyle}
                onChangeText={(text) => {
                  this.setState((previousState) => {
                    return {
                      typedZipCode: text,
                      InvalidZipCode: text,
                    };
                  });
                }}
              />
              {this.state.InvalidZipCode == "" && (
                <Text style={styles.errorText}>Please type a Zip Code</Text>
              )}
              <Text style={styles.subheadingStyle2}>
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
              <Text style={styles.subheadingStyle2}> Enter a Phone Number</Text>
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
                color="#008b8b"
                onPress={() =>
                  this.onPress(
                    this.state.typedName,
                    this.state.typedAddress,
                    this.state.typedCity,
                    this.state.typedState,
                    this.state.typedZipCode,
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
  titleStyle2: {
    color: "#008b8b",
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
  subheadingStyle2: {
    color: "#008b8b",
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
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
});
