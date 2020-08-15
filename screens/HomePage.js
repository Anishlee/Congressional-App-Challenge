import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

export default class HomePage extends Component {
  render() {
    return (
      <View>
        <Text style={styles.titleStyle}>App Title</Text>
        <Button style={styles.StyleforButton} title="New User" />
        <Button style={styles.StyleforButton} title="Volunteer Login" />
        <Button style={styles.StyleforButton} title="User Login" />
        <Button style={styles.StyleforButton} title="Help" />
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
