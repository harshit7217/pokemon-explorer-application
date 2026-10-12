import CardDesign from "./CardDesign";
import Button from "./Button";
import PokemonCard from "./PokemonCard";

const MyFavorite = ({ onSetPokemonDetails, pokemonCard, setPokemonCard }) => {
  const localStorageKey = Object.keys(localStorage);

  const items = localStorageKey.map((val) => {
    const store = localStorage.getItem(val);
    return JSON.parse(store);
  });

  return (
    <div>
      {pokemonCard?.length === 1 ? (
        <div>
          <Button title={"Back"} onClick={() => setPokemonCard([])} />
          <PokemonCard
            pokemon={pokemonCard[0]}
            onSetPokemonDetails={onSetPokemonDetails}
          />
        </div>
      ) : (
        <CardDesign
          searchDetails={items}
          onSetPokemonDetails={onSetPokemonDetails}
        />
      )}
    </div>
  );
};

export default MyFavorite;
