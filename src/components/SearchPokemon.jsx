import { useEffect, useState } from "react";
import CardDesign from "./CardDesign";

const SearchPokemon = ({
  onSetSearchResult,
  setPokemonDetail,
  pokemonDetail,
}) => {
  const [search, setSearch] = useState("");
  const [searchDetails, setSearchDetails] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const showingCard = 10;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon-species?limit=1023",
        );
        const result = await response.json();
        setPokemonList([result.results]);
      } catch (error) {
        console.error("All data fetching:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    setSearchDetails([]);
    if (search === "") {
      setIsLoading(false);
      onSetSearchResult("empty search");
      return;
    }
    const data = pokemonList[0].filter((v) => v.name.includes(search));
    if (search !== "" && data.length === 0) {
      setIsLoading(false);
      onSetSearchResult("not found");
      return;
    }
    try {
      Promise.allSettled(
        data.map(async (results) => {
          const id = results.url.split("/");
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id[id.length - 2]}`,
          );
          const result = await response.json();
          return result;
        }),
      ).then((result) => {
        setIsLoading(false);
        setCount(result.length);
        setSearchDetails([
          ...new Set(
            result.filter((a) => a.status === "fulfilled").map((a) => a.value),
          ),
        ]);
      });
    } catch (error) {
      console.error("Fetch Data Error:", error);
    }

    if (searchDetails.length === 0) {
      onSetSearchResult("ok");
    }
  };

  return (
    <div>
      <div className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo / Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-2xl shadow-md">
              🔴
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                Pokédex
              </p>

              <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl">
                Pokémon Explorer
              </h1>
            </div>
          </div>

          {/* Search Area */}
          <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                placeholder="Search Pokémon, e.g. Ivysaur..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-11 pr-4 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>

            <div className="flex gap-2">
              <button
                className="h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-95"
                onClick={handleSearch}
              >
                Search
              </button>

              <button
                className="h-12 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95"
                onClick={() => {
                  setSearchDetails([]);
                  setSearch("");
                  onSetSearchResult("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="loader" role="status" aria-label="Loading" />
            <span className="text-sm text-slate-500">Loading...</span>
          </div>
        ) : null}
        {searchDetails.length !== 0 ? (
          pokemonDetail.length === 0 ? (
            <div>
              <CardDesign
                searchDetails={searchDetails}
                page={page}
                showingCard={showingCard}
                onSetPokemonDetails={setPokemonDetail}
              />
              <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default SearchPokemon;
