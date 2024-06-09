import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../pages/HomePage'
import RidePage from '../pages/RidePage';

const Home = createNativeStackNavigator()

export function HomeStack() {
    return(
        <Home.Navigator>
            <Home.Screen name="HomePage" component={HomePage} options = {{headerShown:false}}/>
            <Home.Screen name="RidePage" component={RidePage} options = {{headerShown:false}}/>
        </Home.Navigator>
    )
}