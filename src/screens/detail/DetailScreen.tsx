import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { RootStackParams } from '../../navigation/ListTabNavigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInImage } from '../../components/FadeInImage'
import { usePokemon } from './hooks/usePokemon';
import { PokemonInformation } from './components/PokemonInformation';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'>{

}

export const DetailScreen = ( { navigation, route } : Props) => {

  const { top } = useSafeAreaInsets();
  const { simplePokemon, color } = route.params;
  const { isLoading, fullPokemon } = usePokemon(simplePokemon.id)

  return (
    <View style={{flex:1}}>
      <View style={{
        backgroundColor: color,
        ...style.headerContainer
      }}>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            ...style.backButton,
            top: top+20
          }}
          onPress={ ()=> navigation.pop() }
        >
          <Icon 
            name="arrow-back-outline"
            color="white"
            size={35}
          />
        </TouchableOpacity>

        <Text style={{ ...style.pokemonName, top: top+80 }}>
          {simplePokemon.name}
          {"\n#" + simplePokemon.id}
        </Text>

        <Image 
          source = { require('../../assets/pokebola-blanca.png') }
          style={{ ...style.pokeball }}
        />

        <FadeInImage
          uri={simplePokemon.picture}
          style={{...style.pokemonImage}}
        />
      </View>
      

      
      {/* Detalles y Loading */}
      {
          isLoading 
          ? (
              <View style={ style.loadingIndicator }>
                  <ActivityIndicator 
                      color={ color }
                      size={ 50 }
                  />
              </View>
          )
          : <PokemonInformation pokemon={ fullPokemon } />
      }


          

    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: "center",
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000
  },
  backButton: {
    position: "absolute",
    left: 20
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: "absolute",
    bottom: -15
  },
  loadingIndicator:{
    flex: 1,
    justifyContent: "center",
    textAlign: "center"
  }
})
