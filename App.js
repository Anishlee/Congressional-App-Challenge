import React, { Component } from "react";
import AppNavigator from "./navigation/navigation";
//import SQlite from "react-native-sqlite-storage";
//let db;
//SQlite.openDatabase(
//{
// name: "Logininformation.db",
// createFromLocation: 1,
//},
//this.successToOpenDB,
//this.failToOpenDB
//);
//}
//successToOpenDB() {
//alert("success");
// }
//failToOpenDB(err) {
// console.log(err);
//}
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <AppNavigator></AppNavigator>;
  }
}
