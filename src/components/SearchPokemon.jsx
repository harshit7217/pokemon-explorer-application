import { useEffect, useState } from "react";

const SearchPokemon = ({ onReturnHandle }) => {
  const [search, setSearch] = useState("");
  const [searchDetails, setSearchDetails] = useState([]);

  const handleSearch = async () => {
    if (search === "") {
      onReturnHandle("empty search");
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${search}`,
        );
        if (!response.ok) {
          onReturnHandle("not found");
          return;
        }
        const result = await response.json();
        setSearchDetails([result]);
        onReturnHandle("ok");
      } catch (error) {
        console.error("Fetch Data Error:", error);
      }
    };

    fetchData();
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
                onChange={(e) => setSearch(e.target.value)}
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
                  onReturnHandle("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        {searchDetails && (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {searchDetails.map((pokemon) => (
              <div
                key={pokemon.id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Top gradient */}
                <div className="absolute left-0 right-0 top-0 h-36 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100" />

                <div className="relative p-5">
                  {/* ID + icon */}
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-bold text-slate-500 shadow-sm backdrop-blur">
                      #{String(pokemon.id).padStart(3, "0")}
                    </span>

                    <span className="text-xl opacity-70">⚡</span>
                  </div>

                  {/* Pokémon image */}
                  <div className="mt-3 flex justify-center">
                    <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white shadow-lg">
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        className="h-32 w-32 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Name */}
                  <div className="mt-4 text-center">
                    <h2 className="text-2xl font-extrabold capitalize tracking-tight text-slate-800">
                      {pokemon.name}
                    </h2>
                  </div>

                  {/* Types */}
                  <div className="mt-3 flex flex-wrap justify-center gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="rounded-full bg-blue-100 px-4 py-1 text-xs font-bold capitalize text-blue-700"
                      >
                        ⚡ {type.type.name}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-5 border-t border-slate-100" />

                  {/* Stats */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        Base Stats
                      </h3>

                      <span className="text-xs text-slate-400">
                        {pokemon.stats.reduce(
                          (total, stat) => total + stat.base_stat,
                          0,
                        )}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name}>
                          <div className="mb-1 flex items-center justify-between">
                            <span className="text-xs font-medium capitalize text-slate-600">
                              {stat.stat.name.replace("-", " ")}
                            </span>

                            <span className="text-xs font-bold text-slate-800">
                              {stat.base_stat}
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                              style={{
                                width: `${Math.min(
                                  (stat.base_stat / 150) * 100,
                                  100,
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPokemon;
