import PokemonListing from "./components/PokemonListing";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, data } from "react-router-dom";
import MyFavorite from "./components/MyFavorite";
import SearchPokemon from "./components/SearchPokemon";
import Sidebar from "./components/SideBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";
import SortingById from "./components/Sorting.jsx";

function App() {
  const [mainList, setMainList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalElementsPerPage, setTotalElementsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonCard, setPokemonCard] = useState([]);
  const [isFilter, setIsFilter] = useState("");
  const [typeFilterList, setTypeFilterList] = useState([]);
  const [typeFilterData, setTypeFilterData] = useState([]);
  const [sort, setSort] = useState("ascending");
  const [localStorageKey, setLocalStorageKey] = useState(
    Object.keys(localStorage),
  );
  const [myFavorite, setMyFavorite] = useState([]);

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
            return result;
          }),
        ).then((result) => {
          const data = result
            .filter((a) => a.status === "fulfilled")
            .map((a) => a.value);

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
    setSort("ascending");
  }, [isFilter]);

  useEffect(() => {
    onHandlePageAndSearch();
  }, [typeFilterData]);

  useEffect(() => {
    fetchingTypeFilterList();
    onHandlePageAndSearch();
  }, [mainList, sort]);

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

  const findingCurrentElements = (page) => {
    let arr;
    if (isFilter !== "") {
      if (searchTerm !== "") {
        arr = pokemonSearchList(page);
      } else {
        arr = pokemonTypeFilterList(page);
      }
    } else if (searchTerm === "") {
      arr = pokemonDataList(page);
    } else {
      arr = pokemonSearchList(page);
    }
    return arr;
  };

  const onHandlePageAndSearch = async (page = 1) => {
    setCurrentPage(page);
    const arr = findingCurrentElements(page);
    const temp = await fetchPokemonDetails(arr);
    setDataList(temp);
  };

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

  const onHandleOrder = () => {
    const isAscending = sort === "ascending";
    setMainList((prev) => [...prev].reverse());
    setTypeFilterData((prev) => [...prev].reverse());
    setSort(isAscending ? "descending" : "ascending");
  };

  const onSetMyFavorite = (id, check) => {
    if (check) {
      setMyFavorite({ id: id, status: true });
    } else {
      setMyFavorite({ ...myFavorite, status: false });
    }
  };

  return (
    <BrowserRouter>
      {/* Navigation */}
      <SearchPokemon
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onClickSearch={onHandlePageAndSearch}
      />

      <Sidebar />

      <div className="flex">
        <TypeFilter
          isFilter={isFilter}
          setIsFilter={setIsFilter}
          typeFilterList={typeFilterList}
        />
        <SortingById onHandleOrder={onHandleOrder} sort={sort} />
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <PokemonListing
              searchTerm={searchTerm}
              totalElementsPerPage={totalElementsPerPage}
              onHandlePageAndSearch={onHandlePageAndSearch}
              setTotalElementsPerPage={setTotalElementsPerPage}
              currentPage={currentPage}
              searchList={searchList}
              mainList={mainList}
              setIsLoading={setIsLoading}
              dataList={dataList}
              setMainList={setMainList}
              isLoading={isLoading}
              onSetPokemonDetails={onSetPokemonDetails}
              pokemonCard={pokemonCard}
              setPokemonCard={setPokemonCard}
              isFilter={isFilter}
              typeFilterData={typeFilterData}
              myFavorite={myFavorite}
              onSetMyFavorite={onSetMyFavorite}
            />
          }
        />
        <Route
          path="/my-favorite"
          element={
            <MyFavorite
              dataList={dataList}
              onSetPokemonDetails={onSetPokemonDetails}
              pokemonCard={pokemonCard}
              setPokemonCard={setPokemonCard}
              typeFilterData={typeFilterData}
              isFilter={isFilter}
              searchTerm={searchTerm}
              localStorageKey={localStorageKey}
              setLocalStorageKey={setLocalStorageKey}
              sort={sort}
              myFavorite={myFavorite}
              onSetMyFavorite={onSetMyFavorite}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
