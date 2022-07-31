import React from 'react'
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Loading } from '../../components/Loading';
import { PokemonCard } from '../../components/PokemonCard';
import { style as globalStyle} from '../../theme/appTheme';
import { SearchInput } from './components/SearchInput';
import { usePokemonSearch } from './hooks/usePokemonSearch';


const screenWidth = Dimensions.get('window').width;
export const SearchScreen = () => {

    const { top } = useSafeAreaInsets();
    const { isLoading, simplePokemonList } = usePokemonSearch();

    if(isLoading){
        <Loading />
    }

    return (
        <View style={{
            marginHorizontal: 20,
        }}>

            <SearchInput style={{
                position: "absolute",
                width: screenWidth -40,
                top: ( Platform.OS === 'ios' ) ? top : top + 10,
                zIndex: 999
            }}/>

            <FlatList
                    data = {simplePokemonList}
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
    )
}
