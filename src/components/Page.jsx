import { useContext } from "react";
import PageButton from "./PageButton";
import { PokemonCardContext } from "./context/PokemonCardContext";

const Page = () => {
  const useContextData = useContext(PokemonCardContext);
  const currentPage = useContextData.currentPage;
  const totalPage = useContextData.totalPage;

  const array = Array.from({ length: totalPage }, (_, i) => {
    const page = i + 1;
    const isActive = page === currentPage;
    return <PageButton key={i} i={i} isActive={isActive} page={page} />;
  });

  const pageNumber = array.slice(
    Math.min(currentPage - 1, totalPage - 5),
    Math.min(currentPage + 4, totalPage),
  );
  return (
    <div className="flex">
      {currentPage !== 1 ? (
        <div>
          <PageButton i={1 - 1} page={1} />
          <span>.....</span>
        </div>
      ) : null}
      <div className="flex items-center gap-2">{pageNumber}</div>
      {currentPage !== totalPage ? (
        <div>
          <span>.....</span>
          <PageButton i={totalPage - 1} page={totalPage} />
        </div>
      ) : null}
    </div>
  );
};

export default Page;
