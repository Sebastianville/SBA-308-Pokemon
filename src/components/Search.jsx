function Search({ search, updateSearch }) {

    
    function handleChange(event) {
      updateSearch(event.target.value);
    }
  
    return (
      <div>
        <input type="text" placeholder="Search Pokémon" value={search} onChange={handleChange} />
      </div>
    );
  }
  
  export default Search;