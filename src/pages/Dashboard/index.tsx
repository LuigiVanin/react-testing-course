import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { Pokemon } from "../../types/PokemonType";
import { useNavigate } from "react-router-dom";

type IProps = {
  fetchPokemonList: () => Promise<Pokemon[]>;
};

export default function Dashboard({ fetchPokemonList }: IProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemonList().then((data) => setPokemons(data));
  }, []);

  const handleNavigate = (id: number) => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <ul className={styles["container-pokemons"]}>
        {pokemons.map((pokemon) => (
          <li
            key={pokemon.id}
            data-testid={`pokemon-${pokemon.id}`}
            onClick={() => handleNavigate(pokemon.id)}
          >
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <strong>{pokemon.type}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
