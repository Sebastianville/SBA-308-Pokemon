import PokemonCard from "./PokemonCard";

//I want my Favorite Component to be able to render a paragraph when nothing is showing. And to show when the users adds it to their favorite
function Favorite({ favorites, updateFavorite }) {
  return (
    <div>
      <h2>Favorite Pokémon</h2>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet.</p>
      ) : (
        <ul>
          {favorites.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} updateFavorite={updateFavorite} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorite;