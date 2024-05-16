import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontProvider } from './context/FontContext';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    <FontProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FontProvider>
  );
}
