import React from 'react'
import { Image, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { style } from '../../theme/appTheme';
import { usePokemonPaginated } from './hooks/usePokemonPaginated';
import { FadeInImage } from '../../components/FadeInImage';
import { PokemonCard } from '../../components/PokemonCard';
import { Loading } from '../../components/Loading';

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets();
    const { simplePokemonList, loadPokemon } =  usePokemonPaginated();
    // console.log(simplePokemonList);

    return (
        <>
            <Image
                source={ require('../../assets/pokebola.png') }
                style={ style.pokebolaBackground }
            />

            

            <View style={{alignItems: 'center'}}>
                <FlatList style={{top: top + 20}}
                    data = {simplePokemonList}
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={ ({item:pokemon}) => <PokemonCard pokemon={pokemon} />}
                    onEndReached={ loadPokemon }
                    onEndReachedThreshold={0.4}
                    ListHeaderComponent={(
                        <Text style={{
                            ...style.globalMargin,
                            fontSize: 30,
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            marginBottom: 20
                        }}>Pokedex</Text>
                    )}
                    ListFooterComponent={
                        (
                            <ActivityIndicator 
                                style={{
                                    height:100
                                }}
                                size={20}
                                color="grey"
                            />
                        )
                    }
                />
            </View>
        </>
    )
}
