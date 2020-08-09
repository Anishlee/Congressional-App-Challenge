import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <View>
        <TextInput
          style={styles.email}
          keyboardType="email-address"
          placeholder="User Name"
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.password}
          keyboardType="default"
          placeholder="Password"
          secureTextEntry={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  email: {
    height: 40,
    margin: 50,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginLeft: 20,
  },
  password: {
    height: 40,
    margin: 20,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  }
});
