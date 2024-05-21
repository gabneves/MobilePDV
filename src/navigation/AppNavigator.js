import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen.js';
import TermsScreen from '../screens/auth/TermsScreen.js';
import SignupScreen from '../screens/auth/SignupScreen.js';
import SignupValidationScreen from '../screens/auth/SignupValidationScreen.js';
import SignupValidationSucessScreen from '../screens/auth/SignupValidationSucessScreen.js';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen.js';
import NewPasswordScreen from '../screens/auth/NewPasswordScreen.js';
import NewPasswordSucessScreen from '../screens/auth/NewPasswordSucessScreens.js';
import HomeScreen from '../screens/main/HomeScreen.js';
import ProfileScreen from '../screens/main/ProfileScreen.js';


const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <AuthProvider>
            <Stack.Navigator initialRouteName="Profile">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Terms"
                    component={TermsScreen}
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
                <Stack.Screen
                    name="NewPasswordSucess"
                    component={NewPasswordSucessScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </AuthProvider>
    );
};

export default AppNavigator;
