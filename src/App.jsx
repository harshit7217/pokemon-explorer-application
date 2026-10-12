import PokemonListing from "./components/PokemonListing";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, data } from "react-router-dom";
import MyFavorite from "./components/MyFavorite";
import SearchPokemon from "./components/SearchPokemon";
import Sidebar from "./components/SideBar.jsx";

function App() {
  const [mainList, setMainList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalElementsPerPage, setTotalElementsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonCard, setPokemonCard] = useState([]);

  const fetchPokemonDetails = async (arr) => {
    setIsLoading(true);
    return new Promise((resolve, reject) => {
      try {
        Promise.allSettled(
          arr.map(async (results) => {
            const id = results.url.split("/");
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id[id.length - 2]}`,
            );
            const result = await response.json();
            // console.log(result);
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

  const findingCurrentElements = (page, status) => {
    let arr;
    if (status === "clear") {
      arr = mainList.slice(
        (page - 1) * totalElementsPerPage,
        page * totalElementsPerPage,
      );
    } else {
      const searchIncludingElements = searchList();

      arr = searchIncludingElements.slice(
        (page - 1) * totalElementsPerPage,
        page * totalElementsPerPage,
      );
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
      {/* <Link to="/">Home</Link>
      <Link to="/my-favorite">MyFavorite</Link> */}
      <Sidebar />
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
