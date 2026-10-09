import { useState, useEffect, useRef } from "react";
import SearchPokemon from "./SearchPokemon.jsx";
import NotFound from "./NotFound.jsx";
import CardDesign from "./CardDesign.jsx";
import Paging from "./Paging.jsx";

const PokemonListing = () => {
  const [mainList, setMainList] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElementsPerPage, setTotalElementsPerPage] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemonList = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon-species?limit=1023",
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
            const id = results.url.split("/");
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

  const searchList = () => {
    const searchIncludingElements = mainList.filter((val) =>
      val.name.includes(searchTerm),
    );
    return searchIncludingElements;
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

  useEffect(() => {
    fetchPokemonList();
    setTotalElementsPerPage(20);
  }, []);

  useEffect(() => {
    onHandlePageAndSearch(1);
  }, [mainList]);

  return (
    <div className="font-serif">
      <SearchPokemon
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onClickSearch={onHandlePageAndSearch}
      />

      {searchTerm !== "" && dataList.length === 0 ? (
        <NotFound />
      ) : (
        <div>
          {Array.isArray(dataList) && dataList.length > 0 && (
            <div>
              <CardDesign
                searchDetails={dataList}
                onSetPokemonDetails={() => {}}
              />
              {isLoading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="loader" role="status" aria-label="Loading" />
                  <span className="text-sm text-slate-500">Loading...</span>
                </div>
              ) : null}
            </div>
          )}
          {/* Button to fetch more Pokémon - Paging System */}
          <Paging
            currentPage={currentPage}
            totalPage={
              searchTerm === ""
                ? Math.ceil(mainList.length / totalElementsPerPage)
                : Math.ceil(searchList().length / totalElementsPerPage)
            }
            onHandlePage={onHandlePageAndSearch}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonListing;
