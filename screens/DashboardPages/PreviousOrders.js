import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

import flatlistResponse from "./previousOrderResponse.json";

export default class PreviousOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      fetching: true,
    };
  }

  componentDidMount() {
    //${USERID}
    const USERID = this.props.navigation.getParam("userId", "value");
    const url = `http://localhost:8080/mongo/getUserRequestByUserId?userId=${USERID}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json })
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({ fetching: false });
          });
      });
  }

  //<Text style={styles.subheadingStyle}>
  //UserId: {JSON.stringify(USERID)}
  // </Text>

  render() {
    let payments = [];
    //{item.orderDetailList[i].itemDesc}
    const USERID = this.props.navigation.getParam("userId", "value");
    return (
      <View style={{ backgroundColor: "#f0ffff" }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18 }}>Order Number:</Text>
                <Text style={{ fontSize: 18 }}>{item.orderNumber}</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#ffffff",
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
