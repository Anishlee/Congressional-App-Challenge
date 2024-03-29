import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default class PlaceANewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      completedList: "",
      InvalidList: null,
      InvalidDestinationAddress: null,
      InvalidDuration: null,
      InvalidTime: null,
      destinationAddress: "",
      typedTime: "",
      startTime: "",
      duration: "",
      status: "Not Done",
    };
  }
  onPress(List, Value, Status, Time) {
    const { navigation, isFocused } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
        },
      },
    } = navigation;
    const USERID = this.props.navigation.getParam("userId", "value");
    if (List.length != 0) {
      fetch("http://localhost:8080/mongo/insertUserRequest", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemsList: List,
          userId: USERID,
          orderType: Value,
          status: Status,
          completedTime: Time,
          latitude: userInfo.latitude,
          longitude: userInfo.longitude,
        }),
      });
      this.props.navigation.navigate("Dashboard", { updateDashboard: true });
      return true;
    } else {
      if (List.length == 0) {
        this.setState({ InvalidList: "" });
      }
      if (Time.length == 0) {
        this.setState({ InvalidTime: "" });
      }
    }
  }
  onPressDriving(Destination, Time, Duration) {
    if (Destination.length != 0 && Time.length != 0 && Duration.length != 0) {
      this.props.navigation.navigate("Dashboard", {
        Destination: Destination,
        Time: Time,
        Duration: Duration,
      });
      return true;
    } else {
      if (Destination.length == 0) {
        this.setState({ InvalidDestinationAddress: "" });
      }
      if (Time.length == 0) {
        this.setState({ InvalidTime: "" });
      }
      if (Duration.length == 0) {
        this.setState({ InvalidDuration: "" });
      }
    }
  }

  render() {
    const { navigation, isFocused } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
        },
      },
    } = navigation;
    const USERID = this.props.navigation.getParam("userId", "value");
    console.log("UserInfo", JSON.stringify(userInfo));
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
                Place
                <Text style={styles.titleStyle2}> a </Text>
                <Text style={styles.titleStyle}>New </Text>
                <Text style={styles.titleStyle2}>Order</Text>
              </Text>
              <Text style={styles.subheadingStyle}>Type of Order:</Text>
              <DropDownPicker
                items={[
                  {
                    label: "Groceries or picking up anything else",
                    value: "Picking up Items",
                  },
                  {
                    label:
                      "Volunteer will help drive you to your desired location",
                    value: "2",
                  },
                ]}
                placeholder="Please choose a option below"
                containerStyle={{ height: 60 }}
                style={({ backgroundColor: "#fafafa" }, { marginTop: 10 })}
                itemStyle={{
                  justifyContent: "center",
                }}
                dropDownStyle={
                  ({ backgroundColor: "#fafafa" }, { marginTop: 10 })
                }
                labelStyle={{
                  textAlign: "center",
                }}
                onChangeItem={(item) =>
                  this.setState({
                    value: item.value,
                  })
                }
              />
              {this.state.value == "Picking up Items" && (
                <View style={{ marginTop: 30 }}>
                  <Text style={styles.subheadingStyle2}>
                    Please type whatever you need below:
                  </Text>
                  <TextInput
                    style={styles.MultilineDescriptionStyle}
                    placeholder="Please type whatever you need in here"
                    placeholderTextColor="black"
                    multiline={true}
                    borderBottomColor="black"
                    borderBottomWidth={1}
                    borderLeftColor="black"
                    borderLeftWidth={1}
                    borderRightColor="black"
                    borderRightWidth={1}
                    borderTopColor="black"
                    borderTopWidth={1}
                    returnKeyType="done"
                    numberOfLines={2000}
                    onChangeText={(text) => {
                      this.setState((previousState) => {
                        return {
                          completedList: text,
                          InvalidList: text,
                        };
                      });
                    }}
                  />
                  {this.state.InvalidList == "" &&
                    this.state.value == "Picking up Items" && (
                      <Text style={styles.errorText}>
                        Please type your list into the box
                      </Text>
                    )}
                  <Text style={styles.subheadingStyle}>
                    Please enter suitable order completion time:
                  </Text>
                  <TextInput
                    placeholder="Please type your answer here"
                    placeholderTextColor="#000000"
                    keyboardType="email-address"
                    style={styles.emailstyle}
                    onChangeText={(text) => {
                      this.setState((previousState) => {
                        return {
                          typedTime: text,
                          InvalidTime: text,
                        };
                      });
                    }}
                  />
                </View>
              )}
              {this.state.value == "2" && (
                <View>
                  <Text style={styles.textStyle}>
                    Please type your destination address here:
                  </Text>
                  <TextInput
                    style={styles.TextInputStyle}
                    placeholder="Please enter your Destination Address here"
                    placeholderTextColor="#808080"
                    onChangeText={(text) => {
                      this.setState((previousState) => {
                        return {
                          destinationAddress: text,
                        };
                      });
                    }}
                  />
                </View>
              )}
              {this.state.value == "2" &&
                this.state.InvalidDestinationAddress == "" && (
                  <Text style={styles.errorText}>
                    Please type a destination address
                  </Text>
                )}
              {this.state.value == "2" && (
                <View>
                  <Text style={styles.textStyle}>
                    Please type when you would like our volunteers to pick you
                    up:
                  </Text>
                  <TextInput
                    style={styles.TextInputStyle}
                    placeholder="Please enter the time here"
                    placeholderTextColor="#808080"
                    onChangeText={(text) => {
                      this.setState((previousState) => {
                        return {
                          startTime: text,
                        };
                      });
                    }}
                  />
                </View>
              )}
              {this.state.value == "2" && this.state.InvalidTime == "" && (
                <Text style={styles.errorText}>Please type a start time</Text>
              )}
              {this.state.value == "2" && (
                <View>
                  <Text style={styles.textStyle}>
                    Please type approximately how long the trip will be:
                  </Text>
                  <TextInput
                    style={styles.TextInputStyle}
                    placeholder="Please enter the duration here"
                    placeholderTextColor="#808080"
                    onChangeText={(text) => {
                      this.setState((previousState) => {
                        return {
                          duration: text,
                        };
                      });
                    }}
                  />
                </View>
              )}
              {this.state.value == "2" && this.state.InvalidTime == "" && (
                <Text style={styles.errorText}>
                  Please type the duration of the trip
                </Text>
              )}
              {this.state.value == "2" && (
                <Button
                  title="SUBMIT"
                  onPress={() =>
                    this.onPressDriving(
                      this.state.destinationAddress,
                      this.state.startTime,
                      this.state.duration
                    )
                  }
                />
              )}
              {this.state.InvalidTime == "" &&
                this.state.value == "Picking up Items" && (
                  <Text style={styles.errorText}>
                    Please type your time into the box
                  </Text>
                )}
              {this.state.value == "Picking up Items" && (
                <View>
                  <Text style={styles.subheadingStyle3}>
                    Disclaimer: Charge for the above listed items will be
                    charged against the credit card on file.
                  </Text>
                </View>
              )}
              {this.state.value == "Picking up Items" && (
                <Text style={{ marginBottom: 50 }}></Text>
              )}
              {this.state.value == "Picking up Items" && (
                <Button
                  title="Submit"
                  color="#008b8b"
                  onPress={() =>
                    this.onPress(
                      this.state.completedList,
                      this.state.value,
                      this.state.status,
                      this.state.typedTime
                    )
                  }
                />
              )}
              <Text style={{ marginBottom: 650 }}></Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  TextInputStyle: {
    height: 40,
    margin: 20,
    marginBottom: 10,
    borderTopWidth: 0,
    //marginTop: 5,
    borderBottomColor: "black",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    padding: 10,
  },
  emailstyle: {
    height: 40,
    margin: 20,
    borderTopWidth: 1,
    borderBottomColor: "black",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderWidth: 1,
    padding: 10,
  },
  titleStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 20,
  },
  titleStyle2: {
    color: "#008b8b",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 30,
    marginBottom: 20,
  },
  subheadingStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 7.5,
  },
  subheadingStyle2: {
    color: "#008b8b",
    textAlign: "center",
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 7.5,
  },
  subheadingStyle3: {
    color: "#008b8b",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "normal",
    marginBottom: 7.5,
  },
  errorText: {
    color: "red",
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 10,
  },
  MultilineDescriptionStyle: {
    height: 100,
    margin: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },
  textStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 15,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#fffafa",
  },
});
