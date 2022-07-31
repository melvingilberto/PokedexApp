import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigation } from './StackNavigation';
import { SearchScreen } from '../screens/search/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{
            backgroundColor: '#fff'
        }}
        screenOptions={{
            headerShown: false,
            
            tabBarActiveTintColor: '#5856D5',
            tabBarStyle: {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.82)', 
                paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10, 
                borderWidth: 0,
                elevation: 0,
                height: 60,//( Platform.OS === 'ios') ? 70 : 80,
            }
        }}
    >
      <Tab.Screen 
        name="StackNavigation" 
        component={StackNavigation}
        options={{
            tabBarLabel: "Listado",
            tabBarIcon: ({color}) => (<Icon color={color} size={25} name="list-outline" />)
        }}
        />
      <Tab.Screen 
        name="SearchScreen" 
        component={SearchScreen}
        options={{
            tabBarLabel: "Buscar",
            tabBarIcon: ({color}) => (<Icon color={color} size={25} name="search-outline" />)
        }} 
        />
    </Tab.Navigator>
  );
}