import { useState, useEffect, useRef } from "react";
import SearchPokemon from "./SearchPokemon.jsx";
import EmptySearch from "./EmptySearch.jsx";
import NotFound from "./NotFound.jsx";
import PokemonCard from "./PokemonCard.jsx";
import CardDesign from "./CardDesign.jsx";
import Paging from "./Paging.jsx";

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
      let url = data.previous;
      if (pageRef.current === totalPageRef.current) {
        url = `https://pokeapi.co/api/v2/pokemon-species/?offset=1000&limit=${showingCards}`;
      }
      const response = await fetch(url);
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

            {/* Button to fetch more Pokémon - Paging System */}
            <Paging
              showingCards={showingCards}
              pageRef={pageRef}
              paging={paging}
              totalPageRef={totalPageRef}
              onHandlePage={handlePage}
              onHandlePrevPage={handlePrevPage}
              onHandleNextPage={handleNextPage}
            />
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
