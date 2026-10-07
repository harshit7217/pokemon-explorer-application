import { useState, useEffect, useRef } from "react";
import SearchPokemon from "./SearchPokemon.jsx";
import EmptySearch from "./EmptySearch.jsx";
import NotFound from "./NotFound.jsx";

const PokemonListing = () => {
  const [data, setData] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [searchResult, setSearchResult] = useState("");

  const pageRef = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species/",
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data.next !== null) {
          let a = data.next.split("=")[1].split("&")[0] / 20;
          pageRef.current = a;
        }
        Promise.allSettled(
          data.results?.map(async (pokemon) => {
            const id = pokemon.url.split("/");
            const url = "https://pokeapi.co/api/v2/pokemon/" + id[6];
            const response = await fetch(url);
            const result = await response.json();
            return result;
          }),
        ).then((results) => {
          setPokemonDetails(
            results
              .filter((result) => result.status === "fulfilled")
              .map((result) => result.value),
          );
        });
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
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
        pageRef.current = 52;
      }
    } catch (error) {
      console.error(
        "Error fetching first or last page of Pokémon data:",
        error,
      );
    }
  };

  const paging = Array.from({ length: 52 }, (_, index) => (
    <button
      key={index + 1}
      onClick={() =>
        handlePage(
          `https://pokeapi.co/api/v2/pokemon-species/?offset=${index * 20}&limit=20`,
        )
      }
      className="text-blue-500 cursor-pointer hover:text-blue-900 rounded"
    >
      {index + 1}
    </button>
  ));

  return (
    <div className="font-serif">
      <SearchPokemon onReturnHandle={setSearchResult} />
      {searchResult === "" ? (
        <div>
          <div className="flex flex-wrap justify-center font-serif">
            {pokemonDetails.map((pokemon) => (
              <div
                key={pokemon.id}
                className="flex flex-col items-center justify-center border-2 border-gray-300 rounded-lg p-4 m-4 flex-wrap min-w-[300px]"
              >
                <div className=" text-lg font-serif">#{pokemon.id}</div>
                <img
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  className="w-32 h-32 object-contain mb-4 rounded-full border-2 border-gray-300 m-2"
                />
                <div className="font-bold text-lg font-serif">
                  {pokemon.name}
                </div>
                <ul className="flex flex-wrap justify-center gap-10 ">
                  {pokemon.types.map((type) => {
                    return <li key={type.type.name}>⚡{type.type.name}</li>;
                  })}
                </ul>
                <ul className="flex flex-col flex-wrap justify-center items-center gap-1 pt-2">
                  {pokemon.stats.map((stat) => {
                    return (
                      <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          {/* Button to fetch more Pokémon */}
          <div className="flex flex-wrap justify-center gap-4 m-4">
            {/* Button to fetch the first page of Pokémon data */}
            <button
              onClick={() =>
                handlePage(
                  "https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=20",
                )
              }
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer"
            >
              First Page
            </button>
            {/* Button to fetch the previous page of Pokémon data */}
            <button
              onClick={handlePrevPage}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer"
            >
              Prev Page
            </button>
            {/* Paging 1 to 52 */}
            <div className="flex flex-wrap justify-center  gap-2 min-w-[320px]">
              {pageRef.current > 25 ? (
                <div className="flex flex-wrap justify-center items-center text-lg  gap-1 ">
                  <p className="flex flex-wrap justify-center items-center gap-2">
                    {paging.slice(0, 1)}
                  </p>
                  <p className="font-bold text-blue-500"> ... </p>
                  <div className="flex justify-center items-center gap-1">
                    {pageRef.current >= 50
                      ? paging.slice(pageRef.current - 3, pageRef.current + 3)
                      : paging.slice(pageRef.current - 3, pageRef.current + 2)}
                    {pageRef.current < 49 && (
                      <div className="flex flex-wrap justify-center items-center text-lg">
                        <p className="font-bold text-blue-500">...</p>
                        <p className="flex flex-wrap justify-center items-center">
                          {paging.slice(51, 52)}
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
                      : paging.slice(pageRef.current - 2, pageRef.current + 3)}
                  </div>
                  <p className="font-bold text-blue-500"> ... </p>
                  <p className="flex flex-wrap justify-center items-center gap-2">
                    {paging.slice(51, 52)}
                  </p>
                </div>
              )}
            </div>
            {/* Button of next page */}
            <button
              onClick={handleNextPage}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer"
            >
              Next Page
            </button>
            {/* Button of last page */}
            <button
              onClick={() =>
                handlePage(
                  "https://pokeapi.co/api/v2/pokemon-species/?offset=1020&limit=20",
                )
              }
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-[#f2f5f3] hover:text-blue-500 cursor-pointer"
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
  );
};

export default PokemonListing;
