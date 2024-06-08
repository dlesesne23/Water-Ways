import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import RootNavigator from '../src/navigations/RootNavigator'
import React from 'react'


const index = () => {
  return (
    <RootNavigator />
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
