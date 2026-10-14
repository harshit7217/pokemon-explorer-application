import { useContext } from "react";
import Button from "./Button";
import Page from "./Page";
import { PokemonCardContext } from "./context/PokemonCardContext";

const Paging = () => {
  const useContextData = useContext(PokemonCardContext);
  const currentPage = useContextData.currentPage;
  const totalPage = useContextData.totalPage;
  const onHandlePage = useContextData.onHandlePage;

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
      <Page />
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
