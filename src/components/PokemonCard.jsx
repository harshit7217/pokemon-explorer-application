// Usage: <PokemonCard pokemon={pokemonDetail[0]} />
// Requires Tailwind CSS. Class names are written out in full (not built from
// strings) so Tailwind's compiler can detect them.

import FavoriteToggleButton from "./FavoriteToggleButton";

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

export default function PokemonCard({ pokemon }) {
  if (!pokemon) return null;
  const { name, id, sprites, types, height, weight, abilities, stats, moves } =
    pokemon;

  // PokeAPI gives height in decimetres and weight in hectograms
  const heightM = (height / 10).toFixed(1);
  const weightKg = (weight / 10).toFixed(1);

  return (
    <article className="mx-auto flex w-[100vh] max-w-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 md:flex-row m-2">
      {/* LEFT: image panel */}
      <aside className="relative flex flex-col items-center justify-center gap-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-10 text-white md:w-2/5 md:shrink-0">
        <span className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-sm font-semibold backdrop-blur">
          #{String(id).padStart(3, "0")}
        </span>
        <FavoriteToggleButton pokemon={pokemon} />

        <div className="rounded-full bg-white/90 p-3 shadow-lg ring-4 ring-white/40">
          <img
            src={sprites.front_default}
            alt={name}
            className="h-56 w-56 object-contain [image-rendering:pixelated]"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-extrabold capitalize tracking-tight">
            {name}
          </h2>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {types.map(({ type }) => (
              <li
                key={type.name}
                className={`rounded-full px-3 py-1 text-xs font-bold capitalize shadow-sm ${
                  TYPE_STYLES[type.name] ?? "bg-slate-500 text-white"
                }`}
              >
                {type.name}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* RIGHT: content */}
      <div className="flex-1 space-y-8 p-6 md:p-8">
        {/* Height / Weight */}
        <section className="grid grid-cols-2 gap-3 text-center">
          <div className="rounded-2xl bg-slate-50 py-3">
            <p className="text-lg font-bold text-slate-800">{heightM} m</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Height
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 py-3">
            <p className="text-lg font-bold text-slate-800">{weightKg} kg</p>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Weight
            </p>
          </div>
        </section>

        {/* Abilities */}
        <section>
          <SectionTitle>Abilities</SectionTitle>
          <ul className="flex flex-wrap gap-2">
            {abilities.map(({ ability, is_hidden }) => (
              <li
                key={ability.name}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700"
              >
                {titleCase(ability.name)}
                {is_hidden && (
                  <span className="ml-1.5 text-xs text-slate-400">
                    (hidden)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Base stats */}
        <section>
          <SectionTitle>Base stats</SectionTitle>
          <ul className="space-y-2.5">
            {stats.map(({ stat, base_stat }) => (
              <li key={stat.name} className="flex items-center gap-3 text-sm">
                <span className="w-16 shrink-0 text-slate-500">
                  {STAT_LABELS[stat.name] ?? titleCase(stat.name)}
                </span>
                <span className="w-8 shrink-0 text-right font-semibold tabular-nums text-slate-800">
                  {base_stat}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
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

        {/* Moves: scrollable chips so long lists don't stretch the card */}
        <section>
          <SectionTitle>Moves ({moves.length})</SectionTitle>
          <ul className="flex max-h-40 flex-wrap gap-1.5 overflow-y-auto rounded-2xl bg-slate-50 p-3">
            {moves.map(({ move }) => (
              <li
                key={move.name}
                className="rounded-md bg-white px-2 py-1 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200"
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
