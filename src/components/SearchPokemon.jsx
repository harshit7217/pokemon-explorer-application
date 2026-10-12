const SearchPokemon = ({ searchTerm, setSearchTerm, onClickSearch }) => {
  return (
    <div>
      <div className="border-b border-slate-200 bg-white shadow-sm pl-[70px]">
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
              <label htmlFor="pokemon-search" className="sr-only">
                Search Pokémon
              </label>

              {/* Search icon */}
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <path
                  fillRule="evenodd"
                  d="M8.5 3a5.5 5.5 0 013.9 9.4l3.6 3.6a.75.75 0 11-1.06 1.06l-3.6-3.6A5.5 5.5 0 118.5 3zm0 1.5a4 4 0 100 8 4 4 0 000-8z"
                  clipRule="evenodd"
                />
              </svg>

              <input
                id="pokemon-search"
                type="text"
                value={searchTerm}
                placeholder="Search Pokémon, e.g. Ivysaur..."
                autoComplete="off"
                className="h-12 w-full rounded-xl border border-slate-200 bg-white py-2 pl-12 pr-11 text-base text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onClickSearch(1);
                  }
                }}
              />

              {/* Clear button (only when there is text) */}
              {searchTerm && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="red"
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
