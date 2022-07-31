import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { FadeInImage } from './FadeInImage';
import { SimplePokemon } from '../interfaces/PokemonInterface';
import { useEffect, useRef } from 'react';
import ImageColors from 'react-native-image-colors'
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';



const windowWidth = Dimensions.get('window').width

interface Props{
    pokemon: SimplePokemon;
}
export const PokemonCard = ({pokemon} : Props) => {

    const [backgroundColor, setBackgroundColor] = useState('#ddd');
    const isMounted = useRef(true);
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    useEffect(() => {
        
        ImageColors.getColors(pokemon.picture, {
            fallback: '#ddd'
        }).then(colorsImageResponse => {
            if( !isMounted.current ) return;

            switch (colorsImageResponse.platform) {
                case 'android':
                  setBackgroundColor(colorsImageResponse.dominant || "#ddd");
                  break
                case 'ios':
                    setBackgroundColor(colorsImageResponse.background || "#ddd");
                  break
                default:
                    setBackgroundColor("#ddd");

            }
        })
        
        return () => {
            isMounted.current = false;
        }
    }, [])
    

    return (
        <TouchableOpacity 
            activeOpacity={0.9}
            onPress={ () =>{
                navigation.navigate('DetailScreen', {
                    simplePokemon: pokemon,
                    color: backgroundColor
                })
            } }
        >
            <View style={{
                ...style.cardContainer,
                backgroundColor: backgroundColor,
                width: windowWidth * 0.4
                }}>
                <View>
                    <Text style={style.name}>
                        {pokemon.name}
                        { '\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={style.pokebolaContainer}>
                    <Image 
                        source={ require('../assets/pokebola-blanca.png') }
                        style={style.pokebola}
                    />
                </View>

                <FadeInImage 
                    uri={pokemon.picture}
                    style={style.pokemonImage}
                />
            </View>

        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    cardContainer:{
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    name: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
        top: 20,
        left: 10
    },
    pokebolaContainer:{
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: 0,
        right:  0,
        opacity: 0.5,
        overflow: 'hidden'
    },
    pokebola:{
        width:100,
        height:100,
        position: 'absolute',
        right: -20,
        bottom: -20
    },
    pokemonImage:{
        width:120,
        height: 120,
        position: 'absolute',
        bottom: -5,
        right: -8,
    }
});