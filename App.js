import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  Alert,
  Button
} from "react-native";
import { f, database, auth, storage } from "./config/config";
// import * as Facebook from "expo-facebook";
import * as Facebook from "expo-facebook";

export default class App extends Component {
  state = {
    loggedIn: false,
    email: "",
    password: "",
    loading: true
  };

  constructor() {
    super();
    // this.registerUser("test@test.com", "alihaider");
    auth.signOut();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          loggedIn: true,
          loading: false
        });
        console.log("user is logged in");
      } else {
        this.setState({
          loggedIn: false,
          loading: false
        });
        console.log("user is logged out");
      }
    });
  }

  loginUser = () => {
    if (this.state.email !== "" && this.state.password !== "") {
      auth
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => {
          console.log(res);
          this.setState({
            loggedIn: true
          });
        })
        .catch(e => {
          console.log(e);

          Alert.alert(e.message);
        });
    } else {
      Alert.alert("please fill all fields");
    }
  };

  LoginWithFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "813535299043794",
      { permissions: ["public_profile", "email"] }
    );

    if (type === "success") {
      const credentials = f.auth.FacebookAuthProvider.credential(token);
      f.auth()
        .signInWithCredential(credentials)
        .then(res => console.log(res))
        .catch(e => {
          console.log(e);
        });
    }
  };

  registerUser = (email, password) => {
    console.log(email, password);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        {this.state.loading ? (
          <Text>Loading</Text>
        ) : this.state.loggedIn ? (
          <Text>You are logged in</Text>
        ) : (
          <View
            style={{
              marginTop: 30,
              width: "100%",
              alignItems: "center",
              height: 250,
              justifyContent: "space-around"
            }}
          >
            <TouchableHighlight
              onPress={() => this.LoginWithFacebook()}
              style={{ width: 150, height: 30, backgroundColor: "blue" }}
            >
              <Text style={{ color: "white" }}>Login with facebook</Text>
            </TouchableHighlight>
            <TextInput
              placeholder="Your Email"
              onChangeText={val => this.setState({ email: val })}
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "black",
                width: "80%",
                padding: 10,
                borderRadius: 10
              }}
              value={this.state.email}
            />

            <TextInput
              placeholder="Your password"
              onChangeText={val => this.setState({ password: val })}
              style={{
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "black",
                width: "80%",
                padding: 10,
                borderRadius: 10
              }}
              value={this.state.password}
            />

            <Button onPress={() => this.loginUser()} title="Login" />
          </View>
        )}

        {(console.disableYellowBox = true)}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});
