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
      <div className="flex flex-wrap justify-between p-5 gap-5 bg-[#daeddf]">
        <h1 className="font-bold italic text-3xl text-gray-500 font-serif">
          Pokémon Explorer application
        </h1>
        <div className="flex flex-wrap gap-5">
          <input
            type="text"
            value={search}
            placeholder="ivysaur"
            className="border rounded  border-gray-500 min:w-[100px] max:w-[400px] h-[6-vh] bg-[#f2f5f3] p-2 outline text-gray-500"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-10">
            <button
              className="cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-[#f2f5f3] hover:text-blue-500"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-[#f2f5f3] hover:text-blue-500"
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

      <div>
        {search && (
          <div className="flex flex-wrap justify-center font-serif">
            {searchDetails.map((pokemon) => (
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
        )}
      </div>
    </div>
  );
};

export default SearchPokemon;
