import PokemonCard from "./PokemonCard";

function PokemonList({ filteredPokemon, updateFavorite }) {
  return (
    <ul>
      {filteredPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} updateFavorite={updateFavorite} />
      ))}
    </ul>
  );
}

export default PokemonList;