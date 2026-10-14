import CardDesign from "./CardDesign";
import PokemonCard from "./PokemonCard";
import { useContext, useEffect } from "react";
import NotFound from "./NotFound";
import { PokemonCardContext } from "./context/PokemonCardContext";

const MyFavorite = ({ onHandleBasicStructure }) => {
  const useContextData = useContext(PokemonCardContext);
  const pokemonCard = useContextData.pokemonCard;
  const localData = useContextData.localData;

  useEffect(() => {
    onHandleBasicStructure();
  }, []);

  return (
    <div className="min-h-screen w-full min-w-0 pb-20 sm:pb-6 sm:pl-16 lg:pl-[70px]">
      {pokemonCard?.length === 1 ? (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <PokemonCard />
        </div>
      ) : localData.length === 0 ? (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <NotFound />
        </div>
      ) : (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <CardDesign searchDetails={localData} />
        </div>
      )}
    </div>
  );
};

export default MyFavorite;
