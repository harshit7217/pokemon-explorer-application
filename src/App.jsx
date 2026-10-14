import PokemonListing from "./components/PokemonListing";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyFavorite from "./components/MyFavorite";
import SearchPokemon from "./components/SearchPokemon";
import Sidebar from "./components/SideBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";
import Sorting from "./components/Sorting.jsx";
import { useDebouncedCallback } from "use-debounce";

function App() {
  const totalElementsPerPage = 20;
  const [mainList, setMainList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonCard, setPokemonCard] = useState([]);
  const [isFilter, setIsFilter] = useState("");
  const [typeFilterList, setTypeFilterList] = useState([]);
  const [typeFilterData, setTypeFilterData] = useState([]);
  const [sortById, setSortById] = useState("");
  const [myFavorite, setMyFavorite] = useState([]);
  const [sortByName, setSortByName] = useState("");
  const [sortByBaseStats, setSortByBaseStats] = useState("");
  const [localData, setLocalData] = useState([]);

  const fetchPokemonList = async () => {
    setIsLoading(true);
    try {
      const temp = await fetch("https://pokeapi.co/api/v2/pokemon-species");
      const temp2 = await temp.json();
      const count = temp2.count;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species?limit=${count}`,
      );
      const result = await response.json();
      setMainList(result.results);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokemonDetails = async (arr) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      try {
        Promise.allSettled(
          arr.map(async (results) => {
            const id =
              isFilter !== ""
                ? results.pokemon.url.split("/")
                : results.url.split("/");
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id[id.length - 2]}`,
            );
            const result = await response.json();
            let total = 0;
            result.stats.map((a) => (total = total + a.base_stat));
            return result;
          }),
        ).then((result) => {
          const data = result
            .filter((a) => a.status === "fulfilled")
            .map((a) => ({
              ...a.value,
              base_stats: a.value.stats.reduce(
                (accumulator, current) => accumulator + current.base_stat,
                0,
              ),
            }));
          resolve(data);
          setIsLoading(false);
        });
      } catch (err) {
        reject(err);
      }
    });
  };

  const fetchingTypeFilterList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/type");
      const result = await response.json();
      const count = result.count;

      const response2 = await fetch(
        `https://pokeapi.co/api/v2/type?offset=0&limit=${count}`,
      );
      const result2 = await response2.json();
      setTypeFilterList(result2.results);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchingTypeFilterData = async () => {
    setIsLoading(true);
    try {
      const filterId = isFilter.split("/");
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${filterId[filterId.length - 2]}`,
      );
      const result = await response.json();
      setTypeFilterData(result.pokemon);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isFilter === "") {
      onHandlePageAndSearch();
    }
    if (isFilter !== "") {
      fetchingTypeFilterData();
    }
    setSortById("");
    setSortByName("");
    setSortByBaseStats("");
  }, [isFilter]);

  useEffect(() => {
    onHandlePageAndSearch();
  }, [typeFilterData]);

  useEffect(() => {
    fetchingTypeFilterList();
    onHandlePageAndSearch();
  }, [mainList]);

  const onHandleBasicStructure = () => {
    setSearchTerm("");
    setIsFilter("");
    setSortByBaseStats("");
    setSortByName("");
    setSortById("");
  };

  const pokemonDataList = (page) => {
    return mainList.slice(
      (page - 1) * totalElementsPerPage,
      page * totalElementsPerPage,
    );
  };

  const pokemonSearchList = (page) => {
    const searchIncludingElements = searchList();

    return searchIncludingElements.slice(
      (page - 1) * totalElementsPerPage,
      page * totalElementsPerPage,
    );
  };

  const pokemonTypeFilterList = (page) => {
    return typeFilterData.slice(
      (page - 1) * totalElementsPerPage,
      page * totalElementsPerPage,
    );
  };

  const findingCurrentElements = (page, status) => {
    let arr;
    if (isFilter !== "") {
      if (searchTerm !== "") {
        arr = pokemonSearchList(page);
      } else {
        arr = pokemonTypeFilterList(page);
      }
    } else if (searchTerm === "" || status === "noSearch") {
      arr = pokemonDataList(page);
    } else {
      arr = pokemonSearchList(page);
    }
    return arr;
  };

  const onHandlePageAndSearch = async (page = 1, status) => {
    setCurrentPage(page);
    const arr = findingCurrentElements(page, status);
    const temp = await fetchPokemonDetails(arr);
    setDataList(temp);
  };

  const search = useDebouncedCallback(onHandlePageAndSearch, 200);

  const searchList = () => {
    const searchIncludingElements =
      isFilter !== ""
        ? typeFilterData.filter((val) =>
            val.pokemon.name.includes(searchTerm.toLowerCase()),
          )
        : mainList.filter((val) => val.name.includes(searchTerm.toLowerCase()));
    return searchIncludingElements;
  };

  const onSetPokemonDetails = (data) => {
    setPokemonCard([data]);
  };

  const onHandleSortById = (event) => {
    setSortById(event.target.value);
    setSortByName("");
    setSortByBaseStats("");
    if (event.target.value === "ascending") {
      setMainList(
        mainList.sort(
          (a, b) => a.url.split("/")[8 - 2] - b.url.split("/")[8 - 2],
        ),
      );
      setTypeFilterData((prev) =>
        [...prev].sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name)),
      );
    } else {
      setMainList(
        mainList.sort(
          (a, b) => b.url.split("/")[8 - 2] - a.url.split("/")[8 - 2],
        ),
      );
      setTypeFilterData((prev) =>
        [...prev].sort((a, b) => b.pokemon.name.localeCompare(a.pokemon.name)),
      );
    }
  };

  const onHandleOrderByName = (event) => {
    setSortByBaseStats("");
    setSortById("");
    setSortByName(event.target.value);
    if (event.target.value === "a-z") {
      setMainList(mainList.sort((a, b) => a.name.localeCompare(b.name)));
      setTypeFilterData((prev) =>
        [...prev].sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name)),
      );
    } else {
      setMainList(mainList.sort((a, b) => b.name.localeCompare(a.name)));
      setTypeFilterData((prev) =>
        [...prev].sort((a, b) => b.pokemon.name.localeCompare(a.pokemon.name)),
      );
    }
  };

  const onHandleSortByBaseStats = (event) => {
    setSortByBaseStats(event.target.value);
    setSortByName("");
    setSortById("");
    if (event.target.value === "min") {
      setDataList(dataList.sort((a, b) => a.base_stats - b.base_stats));
      setLocalData(localData.sort((a, b) => a.base_stats - b.base_stats));
    } else {
      setDataList(dataList.sort((a, b) => b.base_stats - a.base_stats));
      setLocalData(localData.sort((a, b) => b.base_stats - a.base_stats));
    }
  };

  const onSetMyFavorite = (id, check) => {
    if (check) {
      setMyFavorite({ id: id, status: true });
    } else {
      setMyFavorite({ ...myFavorite, status: false });
    }
  };

  const onHandleLocalStorage = () => {
    const localStorageKey = Object.keys(localStorage);
    const items = localStorageKey.map((val) => {
      const store = localStorage.getItem(val);
      return JSON.parse(store);
    });

    const filterItems = items.filter((item) => {
      return typeFilterData.some((type) =>
        item.name.includes(type.pokemon.name),
      );
    });

    const searchItems =
      filterItems.length === 0
        ? items.filter((item) => {
            return item.name.includes(searchTerm);
          })
        : filterItems.filter((item) => {
            return item.name.includes(searchTerm);
          });

    const temp =
      isFilter !== ""
        ? searchTerm !== ""
          ? searchItems
          : filterItems
        : searchTerm !== ""
          ? searchItems
          : items;
    onHandleLocalStorageSort(temp);
  };

  const onHandleLocalStorageSort = (temp) => {
    if (sortById === "ascending") {
      setLocalData(temp.sort((a, b) => a.id - b.id));
    } else if (sortById === "descending") {
      setLocalData(temp.sort((a, b) => b.id - a.id));
    } else if (sortByName === "a-z") {
      setLocalData(temp.sort((a, b) => a.name.localeCompare(b.name)));
    } else if (sortByName === "z-a") {
      setLocalData(temp.sort((a, b) => b.name.localeCompare(a.name)));
    } else {
      setLocalData(temp);
    }
  };

  useEffect(() => {
    onHandleLocalStorage();
  }, [myFavorite, searchTerm, typeFilterData]);

  return (
    <BrowserRouter>
      <Sidebar />
      {pokemonCard.length === 1 ? null : (
        <div>
          {/* Navigation */}
          <SearchPokemon
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onClickSearch={onHandlePageAndSearch}
            search={search}
          />
          {/* Filter and Sorting */}
          <div className="flex flex-nowrap items-center gap-4 overflow-x-auto border border-gray-200 bg-white p-4 shadow-sm pl-[70px] mt-[1px]">
            <TypeFilter
              isFilter={isFilter}
              setIsFilter={setIsFilter}
              typeFilterList={typeFilterList}
            />
            {/* Sort by Base Stats */}
            <Sorting
              name="sortByBaseStat"
              value={sortByBaseStats}
              onHandleChange={onHandleSortByBaseStats}
              title="Sort By Base Stat"
              firstOption="Minimum Base Stat"
              firstOptionValue="min"
              secondOption="Maximum Base Stat"
              secondOptionValue="max"
            />
            {/* Sort By Name */}
            <Sorting
              name="sortByName"
              value={sortByName}
              onHandleChange={onHandleOrderByName}
              title="Sort By Name"
              firstOption="A-Z"
              firstOptionValue="a-z"
              secondOption="Z-A"
              secondOptionValue="z-a"
            />
            {/* Sorting by Id */}
            <Sorting
              name="sortById"
              value={sortById}
              onHandleChange={onHandleSortById}
              title="Sort By Id"
              firstOption="Ascending Order"
              firstOptionValue="ascending"
              secondOption="Descending Order"
              secondOptionValue="descending"
            />
          </div>
        </div>
      )}

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <PokemonListing
              fetchPokemonList={fetchPokemonList}
              searchTerm={searchTerm}
              totalElementsPerPage={totalElementsPerPage}
              onHandlePageAndSearch={onHandlePageAndSearch}
              currentPage={currentPage}
              searchList={searchList}
              mainList={mainList}
              dataList={dataList}
              isLoading={isLoading}
              onSetPokemonDetails={onSetPokemonDetails}
              pokemonCard={pokemonCard}
              setPokemonCard={setPokemonCard}
              isFilter={isFilter}
              typeFilterData={typeFilterData}
              myFavorite={myFavorite}
              onSetMyFavorite={onSetMyFavorite}
              onHandleBasicStructure={onHandleBasicStructure}
            />
          }
        />
        <Route
          path="/my-favorite"
          element={
            <MyFavorite
              onSetPokemonDetails={onSetPokemonDetails}
              pokemonCard={pokemonCard}
              setPokemonCard={setPokemonCard}
              myFavorite={myFavorite}
              onSetMyFavorite={onSetMyFavorite}
              onHandleBasicStructure={onHandleBasicStructure}
              localData={localData}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
