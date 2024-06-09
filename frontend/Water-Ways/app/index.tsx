import 'react-native-gesture-handler';
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { OriginContextProvider,DestinationContextProvider } from '../src/context/context'
import RootNavigator from '../src/navigations/RootNavigator'
import React from 'react'


const index = () => {
  return (
    <DestinationContextProvider>
      <OriginContextProvider>
          <RootNavigator />
      </OriginContextProvider>
     </DestinationContextProvider>
     
    )
  }
  
  export default index
  
  const styles = StyleSheet.create({
  
  container:{
    flex:1
  }
  
  
  })
