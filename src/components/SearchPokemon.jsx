const SearchPokemon = ({
  searchTerm,
  setSearchTerm,
  onClickSearch,
  search,
}) => {
  return (
    <div className="w-full">
      <div className="border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md sm:pl-16 lg:pl-[70px]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          {/* Logo / Title */}
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 text-2xl shadow-lg shadow-red-500/20 ring-1 ring-red-400/20 sm:h-12 sm:w-12">
              🔴
            </div>

            <div className="min-w-0">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-blue-600 sm:text-xs">
                Pokédex
              </p>

              <h1 className="truncate text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl lg:text-3xl">
                Pokémon Explorer
              </h1>
            </div>
          </div>

          {/* Search Area */}
          <div className="w-full min-w-0 lg:max-w-xl xl:max-w-2xl">
            <div className="group relative flex w-full items-center rounded-2xl border border-slate-200 bg-slate-50/80 p-1.5 shadow-sm transition-all duration-200 hover:border-slate-300 hover:bg-white focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10">
              <label htmlFor="pokemon-search" className="sr-only">
                Search Pokémon
              </label>

              {/* Search Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center text-slate-400 transition-colors group-focus-within:text-blue-500 sm:h-11 sm:w-11">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.5 3a5.5 5.5 0 013.9 9.4l3.6 3.6a.75.75 0 11-1.06 1.06l-3.6-3.6A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <input
                id="pokemon-search"
                type="text"
                value={searchTerm}
                placeholder="Search Pokémon, e.g. Ivysaur..."
                autoComplete="off"
                className="h-10 min-w-0 flex-1 bg-transparent py-2 pr-2 text-sm font-medium text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400 sm:h-11 sm:text-base"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  search();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onClickSearch(1);
                  }
                }}
              />

              {/* Clear Button */}
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchTerm("");
                    onClickSearch(1, "noSearch");
                  }}
                  className="mr-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-200/70 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPokemon;
