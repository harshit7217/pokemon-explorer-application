import { useContext } from "react";
import Button from "./Button";
import Page from "./Page";
import { PokemonCardContext } from "./context/PokemonCardContext";

const Paging = ({ onHandlePage }) => {
  const useContextData = useContext(PokemonCardContext);
  const currentPage = useContextData.currentPage;
  const isFilter = useContextData.isFilter;
  const searchTerm = useContextData.searchTerm;
  const searchList = useContextData.searchList;
  const typeFilterData = useContextData.typeFilterData;
  const totalElementsPerPage = useContextData.totalElementsPerPage;
  const mainList = useContextData.mainList;

  const totalPage =
    isFilter !== ""
      ? searchTerm !== ""
        ? Math.ceil(searchList().length / totalElementsPerPage)
        : Math.ceil(typeFilterData.length / totalElementsPerPage)
      : searchTerm === ""
        ? Math.ceil(mainList.length / totalElementsPerPage)
        : Math.ceil(searchList().length / totalElementsPerPage);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-4 mx-auto w-fit p-3 rounded-2xl bg-white/80">
      {/* Button to fetch the first page of Pokémon data */}
      <Button
        title={"First Page"}
        onClick={() => onHandlePage(1)}
        disabled={currentPage === 1}
      />

      {/* Button to fetch the previous page of Pokémon data */}
      <Button
        title={"Prev Page"}
        onClick={() => onHandlePage(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {/* Paging 1 to totalPageRef.current */}
      <Page
        // currentPage={currentPage}
        totalPage={totalPage}
        onHandlePage={onHandlePage}
      />
      <Button
        title={"Next Page"}
        onClick={() => onHandlePage(currentPage + 1)}
        disabled={currentPage === totalPage}
      />

      {/* Button of last page */}
      <Button
        title={"Last Page"}
        onClick={() => onHandlePage(totalPage)}
        disabled={currentPage === totalPage}
      />
    </div>
  );
};

export default Paging;
