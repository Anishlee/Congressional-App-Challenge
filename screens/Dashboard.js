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
  render() {
    return (
      <View>
        <Text style={styles.titleStyle}>Dashboard</Text>
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
