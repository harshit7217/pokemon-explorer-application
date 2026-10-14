import FavoriteToggleButton from "./FavoriteToggleButton";
import Button from "./Button.jsx";
import { useContext } from "react";
import { PokemonCardContext } from "./context/PokemonCardContext.jsx";

const TYPE_STYLES = {
  normal: "bg-stone-400 text-white",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-yellow-950",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-cyan-950",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-amber-600 text-white",
  flying: "bg-indigo-300 text-indigo-950",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-lime-950",
  rock: "bg-yellow-700 text-white",
  ghost: "bg-violet-700 text-white",
  dragon: "bg-indigo-600 text-white",
  dark: "bg-neutral-700 text-white",
  steel: "bg-slate-400 text-white",
  fairy: "bg-pink-300 text-pink-950",
};

const STAT_LABELS = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

const MAX_STAT = 255; // highest possible base stat

const titleCase = (s) =>
  s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const SectionTitle = ({ children }) => (
  <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
    {children}
  </h3>
);

export default function PokemonCard({ onSetMyFavorite, setPokemonCard }) {
  const pokemon = useContext(PokemonCardContext).pokemonCard[0];
  if (!pokemon) return null;
  const { name, id, sprites, types, height, weight, abilities, stats, moves } =
    pokemon;

  // PokeAPI gives height in decimetres and weight in hectograms
  const heightM = (height / 10).toFixed(1);
  const weightKg = (weight / 10).toFixed(1);

  return (
    <article className="mx-2 flex w-full max-w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 sm:mx-auto sm:rounded-3xl md:flex-row lg:max-w-6xl">
      {/* LEFT: Image Panel */}
      <aside className="relative flex w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4 py-10 text-white sm:gap-5 sm:px-6 sm:py-12 md:w-2/5 md:shrink-0 md:py-10">
        <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur sm:left-5 sm:top-5 sm:text-sm">
          #{String(id).padStart(3, "0")}
        </span>

        <span className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">
          <Button
            title="×"
            onClick={() => setPokemonCard([])}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all duration-200 hover:rotate-90 hover:border-red-200 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 sm:h-9 sm:w-9"
          />
        </span>

        <div className="absolute right-14 top-3 sm:right-16 sm:top-4">
          <FavoriteToggleButton
            pokemon={pokemon}
            onSetMyFavorite={onSetMyFavorite}
          />
        </div>

        <div className="mt-3 rounded-full bg-white/90 p-2.5 shadow-lg ring-4 ring-white/40 sm:p-3">
          <img
            src={sprites.front_default}
            alt={name}
            className="h-36 w-36 object-contain [image-rendering:pixelated] sm:h-48 sm:w-48 md:h-44 md:w-44 lg:h-56 lg:w-56"
          />
        </div>

        <div className="w-full text-center">
          <h2 className="break-words text-2xl font-extrabold capitalize tracking-tight sm:text-3xl">
            {name}
          </h2>

          <ul className="mt-3 flex flex-wrap justify-center gap-2 px-2">
            {types.map(({ type }) => (
              <li
                key={type.name}
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize shadow-sm sm:text-sm ${
                  TYPE_STYLES[type.name] ?? "bg-slate-500 text-white"
                }`}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* RIGHT: Content */}
      <div className="min-w-0 flex-1 space-y-6 p-4 sm:space-y-8 sm:p-6 md:p-6 lg:p-8">
        {/* Height / Weight */}
        <section className="grid grid-cols-2 gap-3 text-center sm:gap-4">
          <div className="rounded-xl bg-slate-50 px-2 py-3 sm:rounded-2xl sm:py-4">
            <p className="break-words text-base font-bold text-slate-800 sm:text-lg">
              {heightM} m
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
              Height
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 px-2 py-3 sm:rounded-2xl sm:py-4">
            <p className="break-words text-base font-bold text-slate-800 sm:text-lg">
              {weightKg} kg
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-slate-500 sm:text-xs">
              Weight
            </p>
          </div>
        </section>

        {/* Abilities */}
        <section className="min-w-0">
          <SectionTitle>Abilities</SectionTitle>
          <ul className="mt-3 flex flex-wrap gap-2">
            {abilities.map(({ ability, is_hidden }) => (
              <li
                key={ability.name}
                className="max-w-full break-words rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 sm:px-3 sm:text-sm"
              >
                {titleCase(ability.name)}
                {is_hidden && (
                  <span className="ml-1 text-xs text-slate-400">(hidden)</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Base Stats */}
        <section className="min-w-0">
          <SectionTitle>Base stats</SectionTitle>
          <ul className="mt-3 space-y-3">
            {stats.map(({ stat, base_stat }) => (
              <li
                key={stat.name}
                className="flex min-w-0 items-center gap-2 text-xs sm:gap-3 sm:text-sm"
              >
                <span className="w-[68px] shrink-0 break-words text-slate-500 sm:w-20">
                  {STAT_LABELS[stat.name] ?? titleCase(stat.name)}
                </span>

                <span className="w-7 shrink-0 text-right font-semibold tabular-nums text-slate-800 sm:w-8">
                  {base_stat}
                </span>

                <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      base_stat >= 100
                        ? "bg-emerald-500"
                        : base_stat >= 60
                          ? "bg-amber-400"
                          : "bg-rose-400"
                    }`}
                    style={{
                      width: `${Math.min((base_stat / MAX_STAT) * 100, 100)}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Moves */}
        <section className="min-w-0">
          <SectionTitle>Moves ({moves.length})</SectionTitle>
          <ul className="mt-3 flex max-h-40 flex-wrap gap-1.5 overflow-y-auto overscroll-contain rounded-xl bg-slate-50 p-2.5 sm:rounded-2xl sm:p-3">
            {moves.map(({ move }) => (
              <li
                key={move.name}
                className="max-w-full break-words rounded-md bg-white px-2 py-1 text-[11px] font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 sm:text-xs"
              >
                {titleCase(move.name)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
