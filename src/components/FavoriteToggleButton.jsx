import { useContext } from "react";
import { PokemonCardContext } from "./context/PokemonCardContext";

const FavoriteToggleButton = ({ pokemon }) => {
  const useContextData = useContext(PokemonCardContext);
  const onSetMyFavorite = useContextData.onSetMyFavorite;
  const isFavorite = !!localStorage.getItem(pokemon.id);
  return (
    <button
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 text-xl shadow-md transition-all duration-150 hover:scale-110 hover:shadow-lg active:scale-90 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
        isFavorite
          ? "border-red-300 bg-red-50"
          : "border-gray-200 bg-white opacity-80 hover:border-red-200 hover:opacity-100"
      }`}
      onClick={() => {
        if (localStorage.getItem(pokemon.id)) {
          onSetMyFavorite(pokemon.id, false);
          localStorage.removeItem(pokemon.id);
        } else {
          localStorage.setItem(pokemon.id, JSON.stringify(pokemon));
          onSetMyFavorite(pokemon.id, true);
        }
      }}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteToggleButton;
