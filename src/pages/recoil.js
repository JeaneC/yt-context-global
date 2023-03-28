import { Pokedex } from "@/data";
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from "recoil";

const levelAtom = atom({
  key: "level",
  default: 1,
});

const pokemonAtom = atom({
  key: "pokemon",
  default: Pokedex[4],
});

export default function Home() {
  return (
    <div className="pokedex-card">
      <Header />
      <Sprite />
      <Description />
      <EatRareCandy />
    </div>
  );
}

function Header() {
  const [pokemon, setPokemon] = useRecoilState(pokemonAtom);

  return <h2>{pokemon.name}</h2>;
}

function Sprite() {
  const [pokemon, setPokemon] = useRecoilState(pokemonAtom);

  return <img src={pokemon.src} alt={pokemon.name} height={100} width={100} />;
}

function Description() {
  const [pokemon, setPokemon] = useRecoilState(pokemonAtom);

  return <div className="pokedex-description">{pokemon.description}</div>;
}

function EatRareCandy() {
  const [pokemon, setPokemon] = useRecoilState(pokemonAtom);
  const [level, setLevel] = useRecoilState(levelAtom);

  return (
    <button
      onClick={() => {
        const nextLevel = level + 1;
        const willEvolve =
          pokemon.evolveAtLevel && nextLevel >= pokemon.evolveAtLevel;

        setLevel(nextLevel);

        if (willEvolve) {
          setPokemon(Pokedex[pokemon.evolvesTo]);
        }
      }}
    >
      Level {level} | Eat Rare Candy
    </button>
  );
}
