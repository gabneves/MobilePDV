import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
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
import SettingsScreen from '../screens/main/SettingsScreen.js';
import EurekaScreen from '../screens/main/EurekaScreen.js'
import MessagesScreen from '../screens/main/MessagesScreen.js'
import FavoritesScreen from '../screens/main/FavoritesScreen.js'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
            tabBarStyle: { height: 78, backgroundColor: '#D9D9D9' },
            tabBarShowLabel: true,
            headerShown: false,
            tabBarActiveTintColor: '#949494',
            tabBarInactiveTintColor: '#949494',
            tabBarLabelStyle: {
                fontSize: 10,
                marginTop: -25,
                paddingBottom: 15,
            },
        }}
    >
        <Tab.Screen
            name="favoritos"
            component={FavoritesScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Image
                        source={require('../assets/icons/Favorites.svg')}
                        style={{ tintColor: color, width: 23, height: 21 }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="eureka"
            component={EurekaScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Image
                        source={require('../assets/icons/Alerts.svg')}
                        style={{ tintColor: color, width: 17, height: 23 }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarIcon: () => (
                    <Image
                        source={require('../assets/icons/CentralFeature.svg')}
                        style={{
                            width: 90,
                            height: 90,
                            marginTop: -80,
                        }}
                    />
                ),
                tabBarLabel: () => null,
            }}
        />
        <Tab.Screen
            name="mensagens"
            component={MessagesScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Image
                        source={require('../assets/icons/Messages.svg')}
                        style={{ tintColor: color, width: 24, height: 24 }}
                    />
                ),
            }}
        />
        <Tab.Screen
            name="configurações"
            component={SettingsScreen}
            options={{
                tabBarIcon: ({ color }) => (
                    <Image
                        source={require('../assets/icons/Settings.svg')}
                        style={{ tintColor: color, width: 24, height: 24 }}
                    />
                ),
            }}
        />
    </Tab.Navigator>
);

const AppNavigator = () => {
    return (
        <AuthProvider>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
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
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Settings"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Eureka"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Messages"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Favorites"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </AuthProvider>
    );
};

export default AppNavigator;
