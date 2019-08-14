import React, { Component } from 'react'
import { Text, View,SafeAreaView,Platform,StatusBar,StyleSheet } from 'react-native'
import {f,database,auth,storage} from './config/config';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <Text> textInComponent </Text>
        <Text> textInComponent </Text>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  androidSafeArea:{
    paddingTop:Platform.OS === "android"? StatusBar.currentHeight : 0
  }
})