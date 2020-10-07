import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { withNavigationFocus } from "react-navigation";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentOrderDetail: [],
      fetching: true,
      check: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { navigation, isFocused } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
        },
      },
    } = navigation;

    if (prevProps.isFocused !== isFocused && userInfo && userInfo.username) {
      setTimeout(() => {
        this.recentOrderInfo(userInfo.username);
      }, 500);
      // console.log("userInfo username", JSON.stringify(userInfo.username));
    }
  }

  componentDidMount() {
    const { navigation, isFocused } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
        },
      },
    } = navigation;

    if (userInfo && userInfo.username) {
      this.recentOrderInfo(userInfo.username);
    }
  }

  recentOrderInfo = (userName) => {
    const recentUserOrder = `http://localhost:8080/mongo/getRecentOrderByUserId?userId=${userName}`;
    fetch(recentUserOrder)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ recentOrderDetail: json })
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({ fetching: false });
          });
      });
  };

  render() {
    const { fetching, recentOrderDetail } = this.state;
    const { navigation } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
          updateDashboard,
        },
      },
    } = navigation;
    // console.log("recentOrderDetail***", JSON.stringify(recentOrderDetail));
    // console.log(recentOrderDetail.length == 0);
    console.log("userInfoz", JSON.stringify(userInfo));

    return (
      <View>
        <Text style={styles.titleStyle}>Hello, {userInfo.name}</Text>
        <Text style={styles.subheadingStyle}> Recent Order: </Text>
        {recentOrderDetail != undefined && (
          <FlatList
            data={recentOrderDetail}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 18 }}>Order Number:</Text>
                  <Text style={{ fontSize: 18, marginLeft: 2 }}>
                    {item.orderNumber}
                  </Text>
                </View>
                <Text style={{ fontSize: 18 }}>
                  Order Created On: {item.date} {"\n"}
                  Order Type : {item.orderType} {"\n"}
                  Status: {item.status} {"\n"}
                  Order Info:
                </Text>
                <FlatList
                  numColumns={1}
                  keyExtractor={(item) => item.orderNumber}
                  data={item.orderDetailList}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={styles.text}> {item.itemDesc} </Text>
                    </View>
                  )}
                />
              </View>
            )}
          />
        )}
        {recentOrderDetail.length == 0 && (
          <Text style={styles.item2}>
            {" "}
            Your most recent order will go here{" "}
          </Text>
        )}
        <Button
          style={styles.StyleforButton}
          title="Place a New Order"
          onPress={() => {
            this.props.navigation.navigate("PlaceANewOrder", {
              userId: userInfo.username,
              navigationConfig: { userInfo: userInfo },
            });
          }}
        />
        <Button
          style={styles.StyleforButton}
          title="Previous Orders"
          onPress={() => {
            this.props.navigation.navigate("PreviousOrders", {
              userId: userInfo.username,
            });
          }}
        />
        <Button
          style={styles.StyleforButton}
          title="Map"
          onPress={() =>
            this.props.navigation.navigate("Map", {
              navigationConfig: { userInfo: userInfo },
            })
          }
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

export default withNavigationFocus(Dashboard);
