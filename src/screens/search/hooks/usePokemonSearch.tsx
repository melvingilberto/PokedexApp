import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../../../api/pokemonApi';
import { PokemonResponse, Result, SimplePokemon } from '../../../interfaces/PokemonInterface';

interface usePokemonSearchInterface {
    isLoading: boolean,
    simplePokemonList: SimplePokemon[],
    loadPokemon: () => {}
}

export const usePokemonSearch = ():usePokemonSearchInterface => {
    const [isLoading, setIsLoading] = useState(false);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const loadPokemon = async () => {
        setIsLoading(true);
        const responsePokemon = await pokemonApi.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon?limit=1200");
        mapPokemonListToSimplePokemon(responsePokemon.data.results);
    }

    const mapPokemonListToSimplePokemon = ( pokemonList: Result[]) => {

        const creatingSimplePokemonList: SimplePokemon[] = pokemonList.map(({name, url}, index) => {

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2];
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            
            return {
                id,
                name,
                picture
            }

        });

        setSimplePokemonList(creatingSimplePokemonList);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon();
    }, [])
    

    return {
        isLoading,
        simplePokemonList,
        loadPokemon
    }
}
