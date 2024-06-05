import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


import HomePage from '../src/pages/HomePage'

const index = () => {
  return (
    <View style={styles.container}>
      <HomePage />
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container:{
    flex:1
  }
})
