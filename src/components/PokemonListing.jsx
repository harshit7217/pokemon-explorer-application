import { useContext, useEffect } from "react";
import NotFound from "./NotFound.jsx";
import CardDesign from "./CardDesign.jsx";
import Paging from "./Paging.jsx";
import PokemonCard from "./PokemonCard.jsx";
import { PokemonCardContext } from "./context/PokemonCardContext.jsx";

const PokemonListing = ({
  fetchPokemonList,
  onHandlePageAndSearch,
  onSetPokemonDetails,
  setPokemonCard,
  onSetMyFavorite,
  onHandleBasicStructure,
}) => {
  const useContextData = useContext(PokemonCardContext);
  const pokemonCard = useContextData.pokemonCard;
  const searchTerm = useContextData.searchTerm;
  const dataList = useContextData.dataList;
  const isLoading = useContextData.isLoading;

  useEffect(() => {
    fetchPokemonList();
    onHandleBasicStructure();
  }, []);

  return (
    <div className="min-h-screen w-full min-w-0 font-serif sm:pl-16 lg:pl-[70px]">
      {searchTerm !== "" && dataList.length === 0 ? (
        <NotFound />
      ) : pokemonCard.length === 1 ? (
        <div className="relative z-[1] w-full px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          <PokemonCard
            onSetMyFavorite={onSetMyFavorite}
            setPokemonCard={setPokemonCard}
          />
        </div>
      ) : (
        <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
          {Array.isArray(dataList) && dataList.length > 0 && (
            <div className="w-full min-w-0">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-6 sm:py-8">
                  <div className="loader" role="status" aria-label="Loading" />
                  <span className="text-sm text-slate-500">Loading...</span>
                </div>
              ) : null}

              <CardDesign
                searchDetails={dataList}
                onSetPokemonDetails={onSetPokemonDetails}
                onSetMyFavorite={onSetMyFavorite}
              />

              {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-3 py-6 sm:py-8">
                  <div className="loader" role="status" aria-label="Loading" />
                  <span className="text-sm text-slate-500">Loading...</span>
                </div>
              ) : null}
            </div>
          )}

          {/* Paging System */}
          <div className="mt-5 w-full min-w-0 pb-24 sm:mt-6 sm:pb-6">
            <Paging onHandlePage={onHandlePageAndSearch} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonListing;
