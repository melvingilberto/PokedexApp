import { useEffect, useRef, useState } from 'react'
import { pokemonApi } from '../../../api/pokemonApi';
import { PokemonResponse, Result, SimplePokemon } from '../../../interfaces/PokemonInterface';

interface usePokemonPaginatedInterface {
    isLoading: boolean,
    simplePokemonList: SimplePokemon[],
    loadPokemon: () => {}
}

export const usePokemonPaginated = ():usePokemonPaginatedInterface => {
    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>([]);

    const nextPageUrl = useRef("https://pokeapi.co/api/v2/pokemon?limit=40");
    const loadPokemon = async () => {
        setIsLoading(true);
        const responsePokemon = await pokemonApi.get<PokemonResponse>(nextPageUrl.current);

        nextPageUrl.current = responsePokemon.data.next;

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

        setSimplePokemonList([
            ...simplePokemonList, 
            ...creatingSimplePokemonList
        ]);

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
