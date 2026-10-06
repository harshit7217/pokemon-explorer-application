import { useState, useEffect, useRef } from "react";

const PokemonListing = () => {
  const [data, setData] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (let i = 0; i < data.results.length; i++) {
          const url = "https://pokeapi.co/api/v2/pokemon/" + (i + 1);
          const response = await fetch(url);
          const result = await response.json();
          setPokemonDetails((prevDetails) => [...prevDetails, result]);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <div>
      {pokemonDetails.map((pokemon) => (
        <div key={pokemon.id}>
          <h3>{pokemon.id}</h3>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h1>{pokemon.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default PokemonListing;
