import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetching: true,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/mongo/getUserDetails")
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json })
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({ fetching: false });
          });
      });
  }

  render() {
    const { fetching, data } = this.state;
    const { navigation } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
        },
      },
    } = navigation;
    const LIST = this.props.navigation.getParam("List", "value");
    const NAME = this.props.navigation.getParam("Name", "value");
    console.log("userInfo", JSON.stringify(userInfo));
    return (
      <View>
        <Text style={styles.subheadingStyle}>List: {JSON.stringify(LIST)}</Text>
        <Text style={styles.titleStyle}>Hello, {userInfo.name}</Text>
        <Button
          style={styles.StyleforButton}
          title="Place a New Order"
          onPress={() => this.props.navigation.navigate("PlaceANewOrder")}
        />
        <Button
          style={styles.StyleforButton}
          title="Previous Orders"
          onPress={() => this.props.navigation.navigate("PreviousOrders")}
        />
        <Button
          style={styles.StyleforButton}
          title="Profile"
          onPress={() => this.props.navigation.navigate("Profile")}
        />
        <Button
          style={styles.StyleforButton}
          title="Settings"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 50,
    marginBottom: 20,
  },
  StyleforButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    fontSize: 20,
  },
});
