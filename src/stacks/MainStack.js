import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import Preload from '../screens/Preload';
import SignIn from '../screens/Preload';
import SignUp from '../screens/Preload';

const Stack = createStackNavigator();

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="Preload" component={Preload} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
)