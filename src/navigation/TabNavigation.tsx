import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ListTabNavigation } from './ListTabNavigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchTabNavigation } from './SearchTabNavigation';

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
        name="ListTabNavigation" 
        component={ListTabNavigation}
        options={{
            tabBarLabel: "Listado",
            tabBarIcon: ({color}) => (<Icon color={color} size={25} name="list-outline" />)
        }}
        />
      <Tab.Screen 
        name="SearchTabNavigation" 
        component={SearchTabNavigation}
        options={{
            tabBarLabel: "Buscar",
            tabBarIcon: ({color}) => (<Icon color={color} size={25} name="search-outline" />)
        }} 
        />
    </Tab.Navigator>
  );
}