import { useState, useEffect, useRef } from "react";
import SearchPokemon from "./SearchPokemon.jsx";
import EmptySearch from "./EmptySearch.jsx";
import NotFound from "./NotFound.jsx";
import PokemonCard from "./PokemonCard.jsx";
import CardDesign from "./CardDesign.jsx";

const PokemonListing = () => {
  const cardReferencePage = 1;
  const showingCards = 20;

  const [data, setData] = useState([]);
  const [pokemonDetailsList, setPokemonDetailsList] = useState([]);
  const [searchResult, setSearchResult] = useState("");
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const pageRef = useRef(1);
  const totalPageRef = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species/",
        );
        const result = await response.json();
        totalPageRef.current = Math.floor(result.count / showingCards) + 1;
        setData(result);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    try {
      console.log(data);
      if (data.next !== null) {
        pageRef.current = data.next.split("=")[1].split("&")[0] / showingCards;
      } else {
        pageRef.current = totalPageRef.current;
      }
      Promise.allSettled(
        data.results?.map(async (pokemon) => {
          const id = pokemon.url.split("/");
          const url = "https://pokeapi.co/api/v2/pokemon/" + id[id.length - 2];
          const response = await fetch(url);
          const result = await response.json();
          return result;
        }),
      ).then((results) => {
        setPokemonDetailsList(
          results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value),
        );
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
    setIsLoading(false);
  }, [data]);

  // Button click handler to fetch the next page of Pokémon data
  const handleNextPage = async () => {
    try {
      if (!data.next) {
        return;
      }
      const response = await fetch(data.next);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching next page of Pokémon data:", error);
    }
  };

  // Button click handler to fetch the previous page of Pokémon data
  const handlePrevPage = async () => {
    try {
      if (!data.previous) return;
      const response = await fetch(data.previous);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching previous page of Pokémon data:", error);
    }
  };

  // Button click handler to fetch the first and last page of Pokémon data
  const handlePage = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      if (result.next === null) {
        pageRef.current = totalPageRef.current;
      }
    } catch (error) {
      console.error(
        "Error fetching first or last page of Pokémon data:",
        error,
      );
    }
  };

  const paging = Array.from({ length: totalPageRef.current }, (_, index) => (
    <button
      key={index + 1}
      onClick={() =>
        handlePage(
          `https://pokeapi.co/api/v2/pokemon-species/?offset=${index * showingCards}&limit=${showingCards}`,
        )
      }
      className={` cursor-pointer hover:text-blue-900 rounded ${index + 1 === pageRef.current ? "text-blue-900" : "text-blue-500"}`}
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="font-serif">
      <SearchPokemon
        onSetSearchResult={setSearchResult}
        setPokemonDetail={setPokemonDetail}
        pokemonDetail={pokemonDetail}
      />
      <div>
        {pokemonDetail.length !== 0 && (
          <div>
            <button
              onClick={() => setPokemonDetail([])}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer hover:border border"
            >
              Back
            </button>
            <PokemonCard pokemon={pokemonDetail[0]} />
          </div>
        )}
      </div>
      <div>
        {searchResult === "" && pokemonDetail.length === 0 ? (
          <div>
            <CardDesign
              searchDetails={pokemonDetailsList}
              page={cardReferencePage}
              showingCard={showingCards}
              onSetPokemonDetails={setPokemonDetail}
            />

            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="loader" role="status" aria-label="Loading" />
                <span className="text-sm text-slate-500">Loading...</span>
              </div>
            ) : null}

            {/* Button to fetch more Pokémon */}
            <div className="flex flex-wrap justify-center gap-4 m-4">
              {/* Button to fetch the first page of Pokémon data */}
              <button
                onClick={() =>
                  handlePage(
                    `https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=${showingCards}`,
                  )
                }
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer hover:border border ${pageRef.current === 1 ? "hidden" : null}`}
              >
                First Page
              </button>
              {/* Button to fetch the previous page of Pokémon data */}
              <button
                onClick={handlePrevPage}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer hover:border border ${pageRef.current === 1 ? "hidden" : null}`}
              >
                Prev Page
              </button>

              {/* Paging 1 to totalPageRef.current */}
              <div className="flex flex-wrap justify-center  gap-2 min-w-[320px]">
                {pageRef.current > totalPageRef.current / 2 ? (
                  <div className="flex flex-wrap justify-center items-center text-lg  gap-1 ">
                    <p className="flex flex-wrap justify-center items-center gap-2">
                      {paging.slice(0, 1)}
                    </p>
                    <p className="font-bold text-blue-500"> ... </p>
                    <div className="flex justify-center items-center gap-1">
                      {pageRef.current >= totalPageRef.current - 2
                        ? paging.slice(pageRef.current - 3, pageRef.current + 3)
                        : paging.slice(
                            pageRef.current - 3,
                            pageRef.current + 2,
                          )}
                      {pageRef.current < totalPageRef.current - 3 && (
                        <div className="flex flex-wrap justify-center items-center text-lg">
                          <p className="font-bold text-blue-500">...</p>
                          <p className="flex flex-wrap justify-center items-center">
                            {paging.slice(
                              totalPageRef.current - 1,
                              totalPageRef.current,
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center items-center text-lg  gap-1">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                      {pageRef.current > 2 && (
                        <div className="flex flex-wrap justify-center items-center text-lg">
                          <p className="flex flex-wrap justify-center items-center">
                            {paging.slice(0, 1)}
                          </p>
                          <p className="font-bold text-blue-500">...</p>
                        </div>
                      )}
                      {pageRef.current === 1
                        ? paging.slice(pageRef.current - 1, pageRef.current + 4)
                        : paging.slice(
                            pageRef.current - 2,
                            pageRef.current + 3,
                          )}
                    </div>
                    <p className="font-bold text-blue-500"> ... </p>
                    <p className="flex flex-wrap justify-center items-center gap-2">
                      {paging.slice(
                        totalPageRef.current - 1,
                        totalPageRef.current,
                      )}
                    </p>
                  </div>
                )}
              </div>
              {/* Button of next page */}
              <button
                onClick={handleNextPage}
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer hover:border border ${pageRef.current === totalPageRef.current ? "hidden" : null}`}
              >
                Next Page
              </button>
              {/* Button of last page */}
              <button
                onClick={() =>
                  handlePage(
                    `https://pokeapi.co/api/v2/pokemon-species/?offset=1020&limit=${showingCards}`,
                  )
                }
                className={`bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer hover:border border ${pageRef.current === totalPageRef.current ? "hidden" : null}`}
              >
                Last Page
              </button>
            </div>
          </div>
        ) : searchResult === "empty search" ? (
          <EmptySearch />
        ) : searchResult === "not found" ? (
          <NotFound />
        ) : null}
      </div>
    </div>
  );
};

export default PokemonListing;
