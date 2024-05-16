import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen.js';
import SignupScreen from '../screens/auth/SignupScreen.js';
import SignupValidationScreen from '../screens/auth/SignupValidationScreen.js';
import SignupValidationSucessScreen from '../screens/auth/SignupValidationSucessScreen.js';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen.js';
import NewPasswordScreen from '../screens/auth/NewPasswordScreens.js';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="NewPassword">
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
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="NewPassword"
                component={NewPasswordScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
