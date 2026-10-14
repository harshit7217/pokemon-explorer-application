import CardDesign from "./CardDesign";
import PokemonCard from "./PokemonCard";
import { useEffect } from "react";
import NotFound from "./NotFound";

const MyFavorite = ({
  onSetPokemonDetails,
  pokemonCard,
  setPokemonCard,
  myFavorite,
  onSetMyFavorite,
  onHandleBasicStructure,
  localData,
}) => {
  useEffect(() => {
    onHandleBasicStructure();
  }, []);

  return (
    <div className="pl-[70px]">
      {pokemonCard?.length === 1 ? (
        <div>
          <PokemonCard
            pokemon={pokemonCard[0]}
            onSetMyFavorite={onSetMyFavorite}
            setPokemonCard={setPokemonCard}
          />
        </div>
      ) : localData.length === 0 ? (
        <NotFound />
      ) : (
        <CardDesign
          searchDetails={localData}
          onSetPokemonDetails={onSetPokemonDetails}
          myFavorite={myFavorite}
          onSetMyFavorite={onSetMyFavorite}
        />
      )}
    </div>
  );
};

export default MyFavorite;
