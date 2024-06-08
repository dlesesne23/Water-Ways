import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RidePage = () => {
  return (
    <View style = {styles.container}>
      <Text>Ride Page</Text>
    </View>
  )
}

export default RidePage

const styles = StyleSheet.create({
  container: {
    paddingTop: 20
  }
})