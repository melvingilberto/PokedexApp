import React, { useState } from 'react'
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../../components/Loading';
import { PokemonCard } from '../../components/PokemonCard';
import { SimplePokemon } from '../../interfaces/PokemonInterface';
import { style as globalStyle} from '../../theme/appTheme';
import { SearchInput } from './components/SearchInput';
import { usePokemonSearch } from './hooks/usePokemonSearch';
import { useEffect } from 'react';


const screenWidth = Dimensions.get('window').width;
export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemonList } = usePokemonSearch();

    const [pokemonFiltered, setPokemonFiltered] = useState<SimplePokemon[]>([]);
    const [term, setTerm] = useState('');

    useEffect(() => {
        if(term.length === 0){
            setPokemonFiltered([]);
        }

        if(isNaN(Number(term))){
            
            setPokemonFiltered(
                simplePokemonList.filter(pokemon => 
                                        pokemon.name.toLowerCase()
                                        .includes(term.toLowerCase())
                                    )
            );
        }else{
            const pokemonById = simplePokemonList.find(pokemon => pokemon.id === term);
            setPokemonFiltered((pokemonById) ? [pokemonById] : []);
        }

    }, [term])
    

    if(isLoading){
        <Loading />
    }

    return (
        <View style={{
            marginHorizontal: 20,
        }}>

            <SearchInput setTerm={setTerm} style={{
                position: "absolute",
                width: screenWidth -40,
                top: ( Platform.OS === 'ios' ) ? top : top + 10,
                zIndex: 999
            }}/>

            <FlatList
                    data = {pokemonFiltered}
                    keyExtractor={ (pokemon) => pokemon.id }
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={ ({item:pokemon}) => <PokemonCard pokemon={pokemon} />}
                    ListHeaderComponent={(
                        <Text style={{
                            ...globalStyle.globalMargin,
                            fontSize: 30,
                            fontWeight: "bold",
                            textTransform: "uppercase",
                            marginBottom: 20,
                            marginTop: ( Platform.OS === 'ios' ) ? top + 50 : top + 80,
                        }}>{term.toUpperCase()}</Text>
                    )}
                />

        </View>
    )
}
