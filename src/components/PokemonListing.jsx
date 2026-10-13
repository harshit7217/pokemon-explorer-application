import { useEffect } from "react";
import NotFound from "./NotFound.jsx";
import CardDesign from "./CardDesign.jsx";
import Paging from "./Paging.jsx";
import PokemonCard from "./PokemonCard.jsx";
import Button from "./Button.jsx";

const PokemonListing = ({
  searchTerm,
  totalElementsPerPage,
  onHandlePageAndSearch,
  setTotalElementsPerPage,
  currentPage,
  searchList,
  mainList,
  setIsLoading,
  dataList,
  setMainList,
  isLoading,
  onSetPokemonDetails,
  pokemonCard,
  setPokemonCard,
  isFilter,
  typeFilterData,
  myFavorite,
  onSetMyFavorite,
}) => {
  const fetchPokemonList = async () => {
    setIsLoading(true);
    try {
      const temp = await fetch("https://pokeapi.co/api/v2/pokemon-species");
      const temp2 = await temp.json();
      const count = temp2.count;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species?limit=${count}`,
      );
      const result = await response.json();
      setMainList(result.results);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList();
    setTotalElementsPerPage(20);
  }, []);

  return (
    <div className="font-serif pl-[70px]">
      {searchTerm !== "" && dataList.length === 0 ? (
        <NotFound />
      ) : pokemonCard.length === 1 ? (
        <div>
          <Button title={"Back"} onClick={() => setPokemonCard([])} />
          <PokemonCard
            pokemon={pokemonCard[0]}
            onSetPokemonDetails={onSetPokemonDetails}
          />
        </div>
      ) : (
        <div>
          {Array.isArray(dataList) && dataList.length > 0 && (
            <div>
              <CardDesign
                searchDetails={dataList}
                onSetPokemonDetails={onSetPokemonDetails}
                myFavorite={myFavorite}
                onSetMyFavorite={onSetMyFavorite}
              />
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="loader" role="status" aria-label="Loading" />
                  <span className="text-sm text-slate-500">Loading...</span>
                </div>
              ) : null}
            </div>
          )}
          {/* Button to fetch more Pokémon - Paging System */}
          <Paging
            currentPage={currentPage}
            totalPage={
              isFilter !== ""
                ? searchTerm !== ""
                  ? Math.ceil(searchList().length / totalElementsPerPage)
                  : Math.ceil(typeFilterData.length / totalElementsPerPage)
                : searchTerm === ""
                  ? Math.ceil(mainList.length / totalElementsPerPage)
                  : Math.ceil(searchList().length / totalElementsPerPage)
            }
            onHandlePage={onHandlePageAndSearch}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonListing;
