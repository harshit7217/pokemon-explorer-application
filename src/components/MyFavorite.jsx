import CardDesign from "./CardDesign";
import Button from "./Button";
import PokemonCard from "./PokemonCard";
import { useEffect, useState } from "react";

const MyFavorite = ({
  onSetPokemonDetails,
  pokemonCard,
  setPokemonCard,
  typeFilterData,
  isFilter,
  searchTerm,
  myFavorite,
  onSetMyFavorite,
  sort,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const t = Object.keys(localStorage).sort((a, b) =>
      sort !== "ascending" ? b - a : a - b,
    );
    const items = t.map((val) => {
      const store = localStorage.getItem(val);
      return JSON.parse(store);
    });

    const filterItems = items.filter((item) => {
      return typeFilterData.some((type) =>
        item.name.includes(type.pokemon.name),
      );
    });

    const searchItems =
      filterItems.length === 0
        ? items.filter((item) => {
            return item.name.includes(searchTerm);
          })
        : filterItems.filter((item) => {
            return item.name.includes(searchTerm);
          });

    const temp =
      isFilter !== ""
        ? searchTerm !== ""
          ? searchItems
          : filterItems
        : searchTerm !== ""
          ? searchItems
          : items;
    setData(temp);
  }, [myFavorite, sort, typeFilterData, searchTerm]);

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
          searchDetails={data}
          onSetPokemonDetails={onSetPokemonDetails}
          myFavorite={myFavorite}
          onSetMyFavorite={onSetMyFavorite}
        />
      )}
    </div>
  );
};

export default MyFavorite;
