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
      startTime: "",
      duration: "",
    };
  }
  onPress(List) {
    if (List.length != 0) {
      this.props.navigation.navigate("Dashboard", {
        List: List,
      });
      return true;
    } else {
      if (List.length == 0) {
        this.setState({ InvalidList: "" });
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
              <Text style={styles.titleStyle}>Place a New Order </Text>
              <Text style={styles.subheadingStyle}>Type of Order:</Text>
              <DropDownPicker
                items={[
                  {
                    label: "Groceries or picking up anything else",
                    value: "1",
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
                  justifyContent: "flex-start",
                }}
                dropDownStyle={
                  ({ backgroundColor: "#fafafa" }, { marginTop: 10 })
                }
                onChangeItem={(item) =>
                  this.setState({
                    value: item.value,
                  })
                }
              />
              {this.state.value == "1" && (
                <View style={{ marginTop: 30 }}>
                  <Text style={styles.subheadingStyle}>
                    Please type whatever you need below:
                  </Text>
                  <TextInput
                    style={styles.MultilineDescriptionStyle}
                    placeholder="Please type whatever you need in here"
                    placeholderTextColor="black"
                    multiline={true}
                    borderBottomColor="black"
                    borderBottomWidth={0.5}
                    borderLeftColor="black"
                    borderLeftWidth={0.5}
                    borderRightColor="black"
                    borderRightWidth={0.5}
                    borderTopColor="black"
                    borderTopWidth={0.5}
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
              {this.state.InvalidList == "" && this.state.value == "1" && (
                <Text style={styles.errorText}>
                  Please type your list into the box
                </Text>
              )}
              {this.state.value == "1" && (
                <Button
                  title="SUBMIT"
                  onPress={() => this.onPress(this.state.completedList)}
                />
              )}
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
  titleStyle: {
    color: "black",
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
});
