import { useContext } from "react";
import { PokemonCardContext } from "./context/PokemonCardContext";

const PageButton = ({ i, isActive, page }) => {
  const onHandlePage = useContext(PokemonCardContext).onHandlePage;
  return (
    <button
      className={`h-9 min-w-9 cursor-pointer rounded-lg px-2 text-sm font-medium transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-95 ${
        isActive
          ? "bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
          : "bg-white text-gray-700 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5"
      }`}
      onClick={() => onHandlePage(i + 1)}
    >
      {page}
    </button>
  );
};

export default PageButton;
