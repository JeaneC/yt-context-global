import { Pokedex } from "@/data";
import { create } from "zustand";

const useStore = create((set) => ({
  level: 1,
  pokemon: Pokedex[4],
  levelUp: (nextLevel) => set(() => ({ level: nextLevel })),
  setPokemon: (pokemon) => set(() => ({ pokemon })),
}));

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
  const pokemon = useStore((store) => store.pokemon);

  return <h2>{pokemon.name}</h2>;
}

function Sprite() {
  const pokemon = useStore((store) => store.pokemon);

  return <img src={pokemon.src} alt={pokemon.name} height={100} width={100} />;
}

function Description() {
  const pokemon = useStore((store) => store.pokemon);

  return <div className="pokedex-description">{pokemon.description}</div>;
}

function EatRareCandy() {
  const pokemon = useStore((store) => store.pokemon);
  const setPokemon = useStore((store) => store.setPokemon);
  const level = useStore((store) => store.level);
  const levelUp = useStore((store) => store.levelUp);

  return (
    <button
      onClick={() => {
        const nextLevel = level + 1;
        const willEvolve =
          pokemon.evolveAtLevel && nextLevel >= pokemon.evolveAtLevel;

        levelUp(nextLevel);

        if (willEvolve) {
          setPokemon(Pokedex[pokemon.evolvesTo]);
        }
      }}
    >
      Level {level} | Eat Rare Candy
    </button>
  );
}
