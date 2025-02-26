function PokemonCard({ pokemon, updateFavorite }) {

    //*This is where we will perform the inverse data flow. This child component is going to pass up the information to the parent by passing data as an argument
    function handleFavorite() {
      updateFavorite(pokemon);
    }
  
    return (
      <li>
        <h3>{pokemon.name}</h3>
        <button onClick={handleFavorite}>Add to Favorites</button>
      </li>
    );
  }
  
  export default PokemonCard;