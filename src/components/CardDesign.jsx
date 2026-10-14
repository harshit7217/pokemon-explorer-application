import FavoriteToggleButton from "./FavoriteToggleButton";

const CardDesign = ({
  searchDetails,
  onSetPokemonDetails,
  myFavorite,
  onSetMyFavorite,
}) => {
  return (
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
              <FavoriteToggleButton
                pokemon={pokemon}
                myFavorite={myFavorite}
                onSetMyFavorite={onSetMyFavorite}
              />
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
                  {type.type.name}
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
                        className={`h-full rounded-full transition-all duration-500 ${stat.base_stat >= 120 ? "bg-[#98ed99]" : stat.base_stat >= 80 ? "bg-[#f7f52f]" : "bg-[#ed837b]"}`}
                        style={{
                          width: `${Math.min(
                            (stat.base_stat / 200) * 100,
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onSetPokemonDetails(pokemon)}
                className="group mt-4 inline-flex items-center gap-2 rounded-full border border-blue-500 bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-white hover:text-blue-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 active:scale-95 cursor-pointer"
              >
                Show More
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardDesign;
