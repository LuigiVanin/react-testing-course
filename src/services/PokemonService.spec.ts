import { faker } from "@faker-js/faker";
import { Pokemon } from "../types/PokemonType";
import { fetchPokemonById, fetchPokemonList } from "./PokemonService";

globalThis.fetch = vi.fn();

// eslint-disable-next-line
function createFetchResponse(data: any) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

describe("Testa o service PokemonService", () => {
  test("Verifica se foi feito um get list para a url correta", async () => {
    const pokemonListResponse: Pokemon[] = [
      {
        id: 1,
        image: faker.image.urlPlaceholder(),
        name: faker.animal.bear.name,
        type: faker.animal.type(),
      },
      {
        id: 2,
        image: faker.image.urlPlaceholder(),
        name: faker.animal.bear.name,
        type: faker.animal.type(),
      },
    ];

    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      createFetchResponse(pokemonListResponse)
    );

    const pokemonList = await fetchPokemonList();

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/pokemon");
    expect(pokemonList).toStrictEqual(pokemonListResponse);
  });

  test("Verifica se foi feito um get detail para a url correta", async () => {
    const pokemonDetailResponse: Pokemon = {
      id: 1,
      image: faker.image.urlPlaceholder(),
      name: faker.animal.bear.name,
      type: faker.animal.type(),
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValue(
      createFetchResponse(pokemonDetailResponse)
    );

    const pokemon = await fetchPokemonById(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/pokemon/1");
    expect(pokemon).toStrictEqual(pokemonDetailResponse);
  });
});
