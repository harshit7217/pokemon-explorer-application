import CardDesign from "./CardDesign";
import Button from "./Button";
import PokemonCard from "./PokemonCard";

const MyFavorite = ({
  onSetPokemonDetails,
  pokemonCard,
  setPokemonCard,
  typeFilterData,
  isFilter,
  searchTerm,
  localStorageKey,
}) => {
  const items = localStorageKey.map((val) => {
    const store = localStorage.getItem(val);
    return JSON.parse(store);
  });

  const filterItems = items.filter((item) => {
    return typeFilterData.some((type) => item.name.includes(type.pokemon.name));
  });

  const searchItems =
    filterItems.length === 0
      ? items.filter((item) => {
          return item.name.includes(searchTerm);
        })
      : filterItems.filter((item) => {
          return item.name.includes(searchTerm);
        });

  return (
    <div className="pl-[70px]">
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
          searchDetails={
            isFilter !== ""
              ? searchTerm !== ""
                ? searchItems
                : filterItems
              : searchTerm !== ""
                ? searchItems
                : items
          }
          onSetPokemonDetails={onSetPokemonDetails}
        />
      )}
    </div>
  );
};

export default MyFavorite;
