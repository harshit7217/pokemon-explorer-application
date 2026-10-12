import PokemonListing from "./components/PokemonListing";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, data } from "react-router-dom";
import MyFavorite from "./components/MyFavorite";
import SearchPokemon from "./components/SearchPokemon";
import Sidebar from "./components/SideBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";

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
        });
      } catch (err) {
        reject(err);
      } finally {
        setIsLoading(false);
      }
    });
  };

  const fetchingTypeFilterList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/type?offset=1&limit=21",
      );
      const result = await response.json();
      const count = result.count;

      const response2 = await fetch(
        `https://pokeapi.co/api/v2/type?offset=1&limit=${count}`,
      );
      const result2 = await response2.json();
      setTypeFilterList(result2.results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
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
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFilter !== "") {
      fetchingTypeFilterData();
    }
  }, [isFilter]);

  useEffect(() => {
    onHandlePageAndSearch();
  }, [typeFilterData]);

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
      arr = pokemonTypeFilterList(page);
    } else if (status === "clear") {
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

  const searchList = () => {
    const searchIncludingElements = mainList.filter((val) =>
      val.name.includes(searchTerm.toLowerCase()),
    );
    return searchIncludingElements;
  };

  const onSetPokemonDetails = (data) => {
    setPokemonCard([data]);
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

      <TypeFilter
        isFilter={isFilter}
        setIsFilter={setIsFilter}
        typeFilterList={typeFilterList}
      />

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
              fetchingTypeFilterList={fetchingTypeFilterList}
              isFilter={isFilter}
              typeFilterData={typeFilterData}
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
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
