import { Pokemon } from "../types/PokemonType";

const BASE_URL = "http://localhost:3000";

export const fetchPokemonList = async (): Promise<Pokemon[]> => {
  const response = await fetch(`${BASE_URL}/pokemon`);
  const data: Pokemon[] = await response.json();

  return data;
};

export const fetchPokemonById = async (pokemonId: number): Promise<Pokemon> => {
  const response = await fetch(`${BASE_URL}/pokemon/${pokemonId}`);
  const data: Pokemon = await response.json();

  return data;
};
