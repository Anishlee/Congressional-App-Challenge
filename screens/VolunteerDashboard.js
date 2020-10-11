import React, { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

export default class VolunteerDashboard extends Component {
  render() {
    const { navigation } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
        },
      },
    } = navigation;
    return (
      <View>
        <Text style={styles.titleStyle}>Hello, {userInfo.name}</Text>
        <Button
          style={styles.StyleforButton}
          title="Current Orders"
          onPress={() =>
            this.props.navigation.navigate("CurrentOrder", {
              navigationConfig: { userInfo: userInfo },
            })
          }
        />
        <Button
          style={styles.StyleforButton}
          title="Choose Your New Order"
          onPress={() =>
            this.props.navigation.navigate("Map", {
              navigationConfig: { userInfo: userInfo },
            })
          }
        />
        <Button
          style={styles.StyleforButton}
          title="Completed Orders"
          onPress={() => {
            this.props.navigation.navigate("CompletedOrders", {
              userId: userInfo.name,
            });
          }}
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
  StyleforButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    fontSize: 20,
  },
  subheadingStyle: {
    color: "black",
    textAlign: "center",
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 0,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#fffafa",
  },
  item2: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    textAlign: "center",
    padding: 30,
    backgroundColor: "#fffafa",
    fontSize: 18,
  },
  text: {
    //flex: 1,
    marginHorizontal: 50,
    // marginTop: 24,
    //padding: 30,
    // backgroundColor: "#fffafa",
    fontSize: 16,
  },
});
