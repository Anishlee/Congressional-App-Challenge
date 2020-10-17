import React, { Component } from "react";
import { TextInput, View, Text, StyleSheet, Button } from "react-native";

Credentials = [
  {
    userName: "Anish",
    password: "abcdefgh",
    email: "",
    type: "User",
  },
  {
    userName: "Aryan",
    password: "abcdef",
    email: "",
    type: "Volunteer",
  },
];
export default class Login extends Component {
  state = {
    isLoading: true,
  };
  constructor(props) {
    super(props);
    this.state = {
      typedText: "",
      typedPassword: "",
      newUser: false,
      modalVisible: false,
      UserName: null,
      PassWord: null,
      userNameError: null,
      passWordError: null,
      userNameAndPasswordError: null,
      inValidUser: null,
    };
  }
  checkForCredentials(Username, Password) {
    let UserName = this.state.UserName;
    let PassWord = this.state.PassWord;
    if (Password == "" && Username == "") {
      this.setState({ UserName: "", PassWord: "" });
    } else if (Password == "") {
      this.setState({ PassWord: "" });
    } else if (Username == "") {
      this.setState({ UserName: "" });
    } else {
      const url = `http://localhost:8080/mongo/getUserDetailsByUserNameAndPassword?username=${Username}&password=${Password}`;
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => {
          this.setState({ checkCredential: json }, () => {
            this.validateCredential(json);
          })
            .catch((err) => {
              this.setState({ inValidUser: "" });
              console.error(err);
            })
            .finally(() => {
              this.setState({ fetching: false });
            });
        });
    }
  }

  validateCredential = (checkCredential) => {
    console.log("checkCredential", checkCredential);
    if (
      !checkCredential ||
      (checkCredential && Object.keys(checkCredential).length === 0)
    ) {
      this.setState({ inValidUser: "" });
    } else if (checkCredential && checkCredential.hasOwnProperty("0")) {
      if (checkCredential["0"].usertype == "user") {
        this.props.navigation.navigate("Dashboard", {
          navigationConfig: { userInfo: checkCredential["0"] },
        });
      } else {
        this.props.navigation.navigate("VolunteerDashboard", {
          navigationConfig: { userInfo: checkCredential["0"] },
        });
      }
      return true;
    }
  };
  /*<Text style={styles.subheadingStyle}>
          User Name: {JSON.stringify(USERNAME)}
        </Text>
        <Text style={styles.subheadingStyle}>
          Password: {JSON.stringify(PASSWORD)}
        </Text>*/
  render() {
    const NAME = this.props.navigation.getParam("Name", "value");
    const ADDRESS = this.props.navigation.getParam("Address", "value");
    const USERNAME = this.props.navigation.getParam("userName", "value");
    const PASSWORD = this.props.navigation.getParam("password", "value");
    const newCredentials = {
      userName: USERNAME,
      password: PASSWORD,
    };
    Credentials.push(NAME, newCredentials);
    return (
      <View style={{ backgroundColor: "#f0ffff" }}>
        <Text style={styles.titleStyle}>
          Login
          <Text style={styles.titleStyle2}> Page </Text>
        </Text>
        <Text style={styles.subheadingStyle2}>Username or Email:</Text>
        <TextInput
          style={styles.emailstyle}
          keyboardType="email-address"
          placeholder="Please enter your Username/Email"
          placeholderTextColor="#808080"
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedText: text,
                UserName: text,
                inValidUser: undefined,
                //userNameAndPasswordError: text,
                //userNameError: text,
              };
            });
          }}
        />
        {this.state.UserName === "" && (
          <Text style={styles.errorText}>Please enter a Username</Text>
        )}
        {this.state.inValidUser === "" && (
          <Text style={styles.errorText}>Your credentials are incorrect</Text>
        )}
        <Text style={{ marginBottom: 95 }}></Text>
        <Text style={styles.subheadingStyle}>Password:</Text>
        <TextInput
          style={styles.passwordstyle}
          keyboardType="email-address"
          placeholder="Please enter your password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState((previousState) => {
              return {
                typedPassword: text,
                PassWord: text,
                inValidUser: undefined,
                //userNameAndPasswordError: text,
                //passWordError: text,
              };
            });
          }}
        />
        {this.state.PassWord === "" && (
          <Text style={styles.errorText}>Please enter a Password</Text>
        )}
        {this.state.inValidUser === "" && (
          <Text style={styles.errorText}>Your credentials are incorrect</Text>
        )}
        <Text style={{ marginBottom: 95 }}></Text>
        <View style={{ fontSize: 30 }}>
          <Button
            title="Submit"
            color="#008b8b"
            onPress={() =>
              this.checkForCredentials(
                this.state.typedText,
                this.state.typedPassword
              )
            }
          ></Button>
        </View>
        <View style={styles.ButtonContainer}>
          <Text style={{ fontSize: 18, marginRight: 10 }}> New to app? </Text>
          <Button
            title="Create an account"
            color="#008b8b"
            onPress={() => this.props.navigation.navigate("CreateAccount")}
          />
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#008b8b",
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
    marginBottom: 10,
  },
  passwordstyle: {
    height: 40,
    margin: 20,
    borderTopWidth: 0,
    borderBottomColor: "black",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  titleStyle: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 50,
    marginBottom: 105,
  },
  titleStyle2: {
    color: "#008b8b",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 40,
    marginTop: 50,
    marginBottom: 105,
  },
  subheadingStyle: {
    color: "#008b8b",
    textAlign: "center",
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subheadingStyle2: {
    color: "black",
    textAlign: "center",
    fontSize: 22.5,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    alignItems: "center",
    marginLeft: 80,
  },
  errorText: {
    color: "red",
    marginTop: 0,
    marginLeft: 20,
    fontSize: 15,
    marginBottom: 0,
  },
});
