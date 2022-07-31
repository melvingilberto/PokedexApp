import { useEffect, useState } from 'react';
import { pokemonApi } from '../../../api/pokemonApi';
import { FullPokemon } from '../../../interfaces/PokemonInterface';

interface usePokemonInterface{
    isLoading: boolean,
    fullPokemon: FullPokemon
}

export const usePokemon = (id:string):usePokemonInterface => {

    const [isLoading, setIsLoading] = useState(true);
    const [fullPokemon, setFullPokemon] = useState({} as FullPokemon);


    const loadPokemon = async () => {
        const fullPokemonResponse = await pokemonApi.get<FullPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setFullPokemon(fullPokemonResponse.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadPokemon();
    }, [])
    
    return {
        isLoading,
        fullPokemon
    }
}
