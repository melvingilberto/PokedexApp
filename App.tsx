import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigation } from './src/navigation/TabNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation></TabNavigation>
    </NavigationContainer>
  )
}

export default App;