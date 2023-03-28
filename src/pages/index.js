import { Pokedex } from "@/data";
import { useContext, useState, createContext } from "react";

const PokemonContext = createContext({});

export default function Home() {
  const [state, setState] = useState({
    level: 1,
    pokemon: Pokedex[4],
  });

  return (
    <PokemonContext.Provider value={{ state, setState }}>
      <div className="pokedex-card">
        <Header />
        <Sprite />
        <Description />
        <EatRareCandy />
      </div>
    </PokemonContext.Provider>
  );
}

function Header() {
  const {
    state: { pokemon },
  } = useContext(PokemonContext);

  return <h2>{pokemon.name}</h2>;
}

function Sprite() {
  const {
    state: { pokemon },
  } = useContext(PokemonContext);

  return <img src={pokemon.src} alt={pokemon.name} height={100} width={100} />;
}

function Description() {
  const {
    state: { pokemon },
  } = useContext(PokemonContext);

  return <div className="pokedex-description">{pokemon.description}</div>;
}

function EatRareCandy() {
  const {
    state: { pokemon, level },
    setState,
  } = useContext(PokemonContext);

  return (
    <button
      onClick={() => {
        const nextLevel = level + 1;
        const willEvolve =
          pokemon.evolveAtLevel && nextLevel >= pokemon.evolveAtLevel;

        setState({
          level: nextLevel,
          pokemon: willEvolve ? Pokedex[pokemon.evolvesTo] : pokemon,
        });
      }}
    >
      Level {level} | Eat Rare Candy
    </button>
  );
}
