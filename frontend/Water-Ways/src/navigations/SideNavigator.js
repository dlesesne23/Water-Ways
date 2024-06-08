import * as React from 'react';
import { createPullNavigator } from '@react-navigation/pull';
import { HomeStack } from './StackNavigators';
import {Icon} from 'react-native-elements';
import {colors} from "../global/styles";

const Pull = createPullNavigator()

export default function PullNavigator() {
    return(
        <Pull.Navigator>
            <Pull.Screen name="HomeStack" component={HomeStack} options = {{headerShown:false}}/>
        </Pull.Navigator>
    )
}