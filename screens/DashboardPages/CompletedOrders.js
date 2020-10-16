import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";

import flatlistResponse from "./previousOrderResponse.json";
export default class CompletedOrders extends Component {
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
    console.log("x", USERID);
    const url = `http://localhost:8080/mongo/getDoneOrderDetailsByVolunteerName?volunteerName=${USERID}`;
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

  render() {
    return (
      <View>
        <Text style={styles.titleStyle}> Completed Orders </Text>
        <FlatList
          data={this.state.data}
          keyExtractor={(item) => item.orderNumber}
          renderItem={({ item }) => {
            console.log("z", JSON.stringify(item.status == "Pending"));
            if (item.status == "Done") {
              return (
                <View style={styles.item}>
                  <Text style={{ fontSize: 20 }}> Order Info: </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 18 }}>
                      Completion Time: {item.completedTime}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 18 }}>
                    Order Created On: {item.date} {"\n"}
                    Order Type : {item.orderType} {"\n"}
                    Status: {item.status} {"\n"}
                    Order Number: {item.orderNumber} {"\n"}
                    User Address: {item.userAddress} {"\n"}
                    User Phone Number: {item.userPhoneNumber} {"\n"}
                  </Text>
                  <Text style={{ fontSize: 20 }}> Order Items: </Text>
                  <FlatList
                    numColumns={1}
                    keyExtractor={(item) => item.itemNumber}
                    data={item.orderDetailList}
                    renderItem={({ item }) => (
                      <View>
                        <Text style={styles.text}> {item.itemDesc} </Text>
                      </View>
                    )}
                  />
                </View>
              );
            }
          }}
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
  item: {
    flex: 1,
    marginHorizontal: 0,
    marginTop: 24,
    padding: 30,
    backgroundColor: "#fffafa",
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
