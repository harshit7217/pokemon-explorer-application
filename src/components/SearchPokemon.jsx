const SearchPokemon = ({ searchTerm, setSearchTerm, onClickSearch }) => {
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
                value={searchTerm}
                placeholder="Search Pokémon, e.g. Ivysaur..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pl-11 pr-4 text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onClickSearch(1);
                  }
                }}
              />
            </div>

            <div className="flex gap-2">
              <button
                className="h-12 rounded-xl bg-blue-600 px-6 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-95"
                onClick={() => onClickSearch(1)}
              >
                Search
              </button>

              <button
                className="h-12 rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:scale-95"
                onClick={() => {
                  setSearchTerm("");
                  onClickSearch(1, "clear");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPokemon;
