import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen.js';
import SignupScreen from '../screens/auth/SignupScreen.js';
import SignupValidationScreen from '../screens/auth/SignupValidationScreen.js';
import SignupValidationSucessScreen from '../screens/auth/SignupValidationSucessScreen.js';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SignupValidationSucess">
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignupValidation"
                component={SignupValidationScreen}
                options={{ headerShown: false }}
            />
                        <Stack.Screen
                name="SignupValidationSucess"
                component={SignupValidationSucessScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
