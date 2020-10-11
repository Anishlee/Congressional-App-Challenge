import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Button } from "react-native";

export default class CurrentOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentOrderDetail: [],
      fetching: true,
      check: "",
      updateOrder: "",
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
        this.recentOrderInfo();
      }, 500);
      // console.log("userInfo username", JSON.stringify(userInfo.username));
    }
  }
  recentOrderInfo = () => {
    const recentUserOrder = `http://localhost:8080/mongo/getOrderDetailsByVolunteerName?volunteerName=${userInfo.name}`;
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

  componentDidMount() {
    if (this.state.recentOrderDetail != undefined) {
      console.log("x", this.state.recentOrderDetail != undefined);
      const { navigation, isFocused } = this.props;
      const {
        state: {
          params: {
            navigationConfig: { userInfo },
          },
        },
      } = navigation;
      const recentUserOrder = `http://localhost:8080/mongo/getOrderDetailsByVolunteerName?volunteerName=${userInfo.name}`;
      fetch(recentUserOrder)
        .then((response) => response.json())
        .then((json) => {
          this.setState({ recentOrderDetail: json })
            .catch((err) => console.error(err))
            .finally(() => {
              this.setState({ fetching: false });
            });
        });
    }
  }
  onPress(orderNumber, volunteerName, phoneNumber) {
    var currentdate = new Date().toLocaleString();

    console.log(currentdate);
    const updateOrders = `http://localhost:8080/mongo/updateOrderStatus2?OrderNumber=${orderNumber}&status=Pending&VolunteerName=${volunteerName}&PhoneNumber=${phoneNumber}&EndTime=${currentdate}`;
    fetch(updateOrders)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ updateOrder: json })
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({ fetching: false });
          });
      });
    console.log("xy", this.state.updateOrder);

    this.props.navigation.navigate("VolunteerDashboard");
  }

  render() {
    console.log("x", JSON.stringify(this.state.recentOrderDetail));

    return (
      <View>
        <Text style={styles.titleStyle}> Current Orders: </Text>
        <FlatList
          data={this.state.recentOrderDetail}
          keyExtractor={(item) => item.orderNumber}
          renderItem={({ item }) => {
            console.log("z", JSON.stringify(item.status == "Pending"));
            if (item.status == "inProgress") {
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
                  <Button
                    title="Complete Order"
                    onPress={() =>
                      this.onPress(
                        item.orderNumber,
                        item.volunteerName,
                        item.phoneNumber
                      )
                    }
                  />
                </View>
              );
            } else {
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
                  <Button title="Order Pending Completion" />
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
