const Paging = ({
  showingCards,
  pageRef,
  paging,
  totalPageRef,
  onHandlePage,
  onHandlePrevPage,
  onHandleNextPage,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-4 mx-auto w-fit p-3 rounded-2xl bg-white/80">
      {/* Button to fetch the first page of Pokémon data */}
      <button
        onClick={() =>
          onHandlePage(
            `https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=${showingCards}`,
          )
        }
        className={`px-4 py-2 rounded-full border border-blue-500 bg-blue-500 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:bg-white hover:text-blue-500 hover:shadow-md active:scale-95 cursor-pointer ${pageRef.current === 1 ? "hidden" : null}`}
      >
        First Page
      </button>
      {/* Button to fetch the previous page of Pokémon data */}
      <button
        onClick={() => onHandlePrevPage()}
        className={`px-4 py-2 rounded-full border border-blue-500 bg-blue-500 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:bg-white hover:text-blue-500 hover:shadow-md active:scale-95 cursor-pointer ${pageRef.current === 1 ? "hidden" : null}`}
      >
        Prev Page
      </button>

      {/* Paging 1 to totalPageRef.current */}
      <div className="flex flex-wrap justify-center items-center gap-2 min-w-[320px] px-2">
        {pageRef.current > totalPageRef.current / 2 ? (
          <div className="flex flex-wrap justify-center items-center text-base font-medium text-gray-700 gap-2">
            <p className="flex flex-wrap justify-center items-center gap-2">
              {paging.slice(0, 1)}
            </p>
            <p className="font-bold text-blue-400 tracking-widest"> ... </p>
            <div className="flex justify-center items-center gap-2">
              {pageRef.current >= totalPageRef.current - 2
                ? paging.slice(pageRef.current - 3, pageRef.current + 3)
                : paging.slice(pageRef.current - 3, pageRef.current + 2)}
              {pageRef.current < totalPageRef.current - 3 && (
                <div className="flex flex-wrap justify-center items-center gap-2 text-base">
                  <p className="font-bold text-blue-400 tracking-widest">...</p>
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
          <div className="flex flex-wrap justify-center items-center text-base font-medium text-gray-700 gap-2">
            <div className="flex flex-wrap justify-center items-center gap-2">
              {pageRef.current > 2 && (
                <div className="flex flex-wrap justify-center items-center gap-2 text-base">
                  <p className="flex flex-wrap justify-center items-center">
                    {paging.slice(0, 1)}
                  </p>
                  <p className="font-bold text-blue-400 tracking-widest">...</p>
                </div>
              )}
              {pageRef.current === 1
                ? paging.slice(pageRef.current - 1, pageRef.current + 4)
                : paging.slice(pageRef.current - 2, pageRef.current + 3)}
            </div>
            <p className="font-bold text-blue-400 tracking-widest"> ... </p>
            <p className="flex flex-wrap justify-center items-center gap-2">
              {paging.slice(totalPageRef.current - 1, totalPageRef.current)}
            </p>
          </div>
        )}
      </div>
      {/* Button of next page */}
      <button
        onClick={() => onHandleNextPage()}
        className={`px-4 py-2 rounded-full border border-blue-500 bg-blue-500 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:bg-white hover:text-blue-500 hover:shadow-md active:scale-95 cursor-pointer ${pageRef.current === totalPageRef.current ? "hidden" : null}`}
      >
        Next Page
      </button>
      {/* Button of last page */}
      <button
        onClick={() =>
          onHandlePage(
            `https://pokeapi.co/api/v2/pokemon-species/?offset=1020&limit=${showingCards}`,
          )
        }
        className={`px-4 py-2 rounded-full border border-blue-500 bg-blue-500 text-white text-sm font-medium shadow-sm transition-all duration-200 hover:bg-white hover:text-blue-500 hover:shadow-md active:scale-95 cursor-pointer ${pageRef.current === totalPageRef.current ? "hidden" : null}`}
      >
        Last Page
      </button>
    </div>
  );
};

export default Paging;
