import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FontProvider } from './src/context/FontContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <FontProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FontProvider>
  );
}
