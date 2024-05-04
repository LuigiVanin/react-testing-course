import { render, screen } from "@testing-library/react";
import PokemonDetail from ".";
import * as rrd from "react-router-dom";
import { fetchPokemonById } from "../../services/PokemonService";
import { mockPokemonList } from "../../../tests/mocks/pokemons";

const mockFetchPokemonDetailFn = vi
  .fn(fetchPokemonById)
  .mockImplementation(async () => mockPokemonList[0]!);

vi.mock("react-router-dom", () => {
  return {
    useParams: () => ({
      id: 1,
    }),
    Link: vi.fn().mockImplementation((props) => props.children),
  };
});

describe("Testa o component PokemonDetail", () => {
  beforeAll(() => {});

  afterAll(() => {
    vi.resetAllMocks();
  });

  test("Deve haver um título na página", async () => {
    render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

    const pikachu = await screen.findByText("Pikachu");
    expect(pikachu).toBeInTheDocument();
  });

  test("Deve haver um link para voltar", async () => {
    render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

    const linkBack = await screen.findByText("Voltar");
    expect(linkBack).toBeInTheDocument();
  });

  test("Deve validar quando não vier parâmetro na rota", async () => {
    vi.spyOn(rrd, "useParams").mockImplementationOnce(() => ({ id: "0" }));

    render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

    const errorText = await screen.findByText("O id não é válido!");
    expect(errorText).toBeInTheDocument();
  });
});
