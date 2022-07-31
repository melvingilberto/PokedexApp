import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DetailScreen } from '../screens/detail/DetailScreen';
import { SimplePokemon } from '../interfaces/PokemonInterface';
import { SearchScreen } from '../screens/search/SearchScreen';

export type RootStackParams = {
    SearchScreen: undefined;
    DetailScreen: {
        simplePokemon: SimplePokemon,
        color: string
    }
}

const Stack = createStackNavigator<RootStackParams>();
export const SearchTabNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle:{
                    backgroundColor:"#fff"
                }
            }}
            
        >
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
    )
}
