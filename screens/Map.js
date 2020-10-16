import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import carImage from "./Images/car.png";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Orders: [],
      updateOrder: false,
      fetching: true,
      pinColor: "yellow",
    };
  }

  onRegionChange(region) {
    this.setState({ region });
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
  onPressMarker = () => {
    console.log("Marker on press");
    this.setState({ pinColor: "green" });
    console.log(this.state.pinColor);
    this.props.navigation.navigate("Dashboard");
  };

  recentOrderInfo = () => {
    const recentUserOrder = `http://localhost:8080/mongo/getUserOrderByStatus?Status=Not Done`;
    fetch(recentUserOrder)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ Orders: json })
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({ fetching: false });
          });
      });
  };
  onPress(orderNumber, volunteerName, phoneNumber) {
    var currentdate = new Date().toLocaleString();

    console.log(currentdate);
    const updateOrders = `http://localhost:8080/mongo/updateOrderStatus?OrderNumber=${orderNumber}&status=inProgress&VolunteerName=${volunteerName}&PhoneNumber=${phoneNumber}&StartTime=${currentdate}`;
    fetch(updateOrders)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ updateOrder: json })
          .catch((err) => console.error(err))
          .finally(() => {
            this.setState({ fetching: false });
          });
      });
    console.log(this.state.updateOrder);
    this.props.navigation.navigate("VolunteerDashboard", {
      orderNumber: orderNumber,
    });
  }
  mapMarkers = () => {
    const { fetching, Orders } = this.state;
    const { navigation } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
          updateDashboard,
        },
      },
    } = navigation;
    return Orders.map((order) => {
      const orderNumber = order.orderNumber;
      const pointerDescription = `
      Order No: ${order.orderNumber}
      Order created On: ${order.date}
      Status: ${order.status}
      Order Type: ${order.orderType}
      Order Info: ${
        Array.isArray(order.orderDetailList) &&
        order.orderDetailList[0] &&
        order.orderDetailList[0].itemDesc
      }`;

      return (
        <Marker
          key={order.orderNumber}
          pinColor="red"
          coordinate={{
            latitude: order.latitude,
            longitude: order.longitude,
          }}
          onCalloutPress={() =>
            this.onPress(orderNumber, userInfo.name, userInfo.phonenumber)
          }
        >
          <Callout>
            <Text>{pointerDescription}</Text>
            <Button title="Start Order" />
          </Callout>
        </Marker>
      );
    });
  };
  render() {
    const { fetching, Orders } = this.state;
    const { navigation } = this.props;
    const {
      state: {
        params: {
          navigationConfig: { userInfo },
          updateDashboard,
        },
      },
    } = navigation;
    console.log("Orders***", JSON.stringify(Orders));
    console.log("userInfo", JSON.stringify(userInfo));
    console.log(this.state.pinColor);
    var x = userInfo.latitude;
    var y = userInfo.longitude;
    var mapStyle = [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ];
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 36.3729,
            longitude: -94.2088,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.mapMarkers()}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
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
