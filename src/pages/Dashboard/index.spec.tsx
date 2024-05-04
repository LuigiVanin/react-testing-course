import { fireEvent, render, screen } from "@testing-library/react";
import Dashboard from "./index";
import { Pokemon } from "../../types/PokemonType";
import { fetchPokemonList } from "../../services/PokemonService";
import { mockPokemonList } from "../../../tests/mocks/pokemons";

const mockFetchPokemonListFn = vi
  .fn(fetchPokemonList)
  .mockImplementation(async (): Promise<Pokemon[]> => [...mockPokemonList]);

const navigateMock = vi.fn();

vi.mock("react-router-dom", () => {
  return {
    useNavigate() {
      return navigateMock;
    },
  };
});

describe("Test Dashboard component", () => {
  beforeAll(() => {});

  afterAll(() => {
    vi.resetAllMocks();
  });

  test("Should have the title 'Dashboard'", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonListFn} />);
    const title = await screen.findByRole("heading");

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Dashboard/i);
  });

  test("Should have a screen with 10 pokemons", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonListFn} />);

    const items = await screen.findAllByRole("listitem");

    expect(items).toHaveLength(10);
  });

  test("Must have a pikachu on the screen", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonListFn} />);

    const pikachu = await screen.findByText(/pikachu/i);

    expect(pikachu).toBeInTheDocument();
  });

  test("Should navigate to the pokemon detail page", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonListFn} />);

    const link = await screen.findByText(mockPokemonList[0]!.name);

    fireEvent.click(link);

    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith("/pokemon/1");
  });

  test("Should navigate to the pokemon on click | testing all pokemons", async () => {
    render(<Dashboard fetchPokemonList={mockFetchPokemonListFn} />);

    mockPokemonList.forEach(async (pokemon) => {
      const link = await screen.findByText(pokemon.name);
      fireEvent.click(link);

      expect(navigateMock).toHaveBeenCalledTimes(1);
      expect(navigateMock).toHaveBeenCalledWith(`/pokemon/${pokemon.id}`);
    });
  });
});
