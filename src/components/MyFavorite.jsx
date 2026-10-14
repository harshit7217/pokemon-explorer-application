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
    <div className="min-h-screen w-full min-w-0 pb-20 sm:pb-6 sm:pl-16 lg:pl-[70px]">
      {pokemonCard?.length === 1 ? (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <PokemonCard
            pokemon={pokemonCard[0]}
            onSetMyFavorite={onSetMyFavorite}
            setPokemonCard={setPokemonCard}
          />
        </div>
      ) : localData.length === 0 ? (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <NotFound />
        </div>
      ) : (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <CardDesign
            searchDetails={localData}
            onSetPokemonDetails={onSetPokemonDetails}
            myFavorite={myFavorite}
            onSetMyFavorite={onSetMyFavorite}
          />
        </div>
      )}
    </div>
  );
};

export default MyFavorite;
