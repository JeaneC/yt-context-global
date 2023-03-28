import { Pokedex } from "@/data";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    level: 1,
    pokemon: Pokedex[4],
  },
  reducers: {
    levelUp: (state, action) => {
      state.level = action.payload;
    },
    setPokemon: (state, action) => {
      state.pokemon = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
  },
});

export default function Home() {
  return (
    <Provider store={store}>
      <div className="pokedex-card">
        <Header />
        <Sprite />
        <Description />
        <EatRareCandy />
      </div>
    </Provider>
  );
}

function Header() {
  const pokemon = useSelector((state) => state.main.pokemon);

  return <h2>{pokemon.name}</h2>;
}

function Sprite() {
  const pokemon = useSelector((state) => state.main.pokemon);

  return <img src={pokemon.src} alt={pokemon.name} height={100} width={100} />;
}

function Description() {
  const pokemon = useSelector((state) => state.main.pokemon);

  return <div className="pokedex-description">{pokemon.description}</div>;
}

function EatRareCandy() {
  const pokemon = useSelector((state) => state.main.pokemon);
  const level = useSelector((state) => state.main.level);
  const dispatch = useDispatch();
  const { levelUp, setPokemon } = mainSlice.actions;

  return (
    <button
      onClick={() => {
        const nextLevel = level + 1;
        const willEvolve =
          pokemon.evolveAtLevel && nextLevel >= pokemon.evolveAtLevel;

        dispatch(levelUp(nextLevel));

        if (willEvolve) {
          dispatch(setPokemon(Pokedex[pokemon.evolvesTo]));
        }
      }}
    >
      Level {level} | Eat Rare Candy
    </button>
  );
}
