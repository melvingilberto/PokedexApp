import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DetailScreen } from '../screens/detail/DetailScreen';
import { SimplePokemon } from '../interfaces/PokemonInterface';

export type RootStackParams = {
    HomeScreen: undefined;
    DetailScreen: {
        simplePokemon: SimplePokemon,
        color: string
    }
}

const Stack = createStackNavigator<RootStackParams>();
export const ListTabNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor:"#fff"
                }
            }}
            
        >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
    )
}
