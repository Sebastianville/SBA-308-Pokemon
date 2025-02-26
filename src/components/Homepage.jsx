// src/HomePage.js
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./PokemonList";
import Search from "./Search";
import Favorites from './Favorites'
function HomePage () {

    //*This is what I am going to use to pass down to search component and be able to track it down.
    const [search, setSearch] = useState('');

    //!this is where the data is going to be stored when I get it from the API.
    const [pokemon, setPokemon] = useState([]);

    const [favorites, setFavorites] = useState([]);

    //! I learned about this through Dev (https://dev.to/darkmavis1980/fetching-data-with-react-hooks-and-axios-114h). I am trying to apply it correctly 
    const [loading, setLoading] = useState(true);

    axios.defaults.baseURL = 'https://pokeapi.co/api/v2';
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/pokemon?limit=151');
                console.log('hello')
                console.log(response)
                //! I just want the information that is in results. results is an array with multiple objects. I also needed to install npm install axios for axios to work 
                setPokemon(response.data.results);
            } catch(e) {
                console.error(e);
            }
            setLoading(false);
        };
        fetchData();
    }, []);
    
    //*create a callback function to pass down to Search component that will change the setSearch. 
    function updateSearch(newSearch) {
        setSearch(newSearch);
      }

      //!We want to first find if the pokemon already exists in the list. In case that the pokemon is found in the list we want to remove it and if the pokemone does not exist in the list we want to add it. This allows me to be able toggle it. We are going to use a call back function that is going to be passdown from the homepage to PokemoneList. This will allow the child component to affect the parent component. This is called inverse data flow. We are going to use the state favorite to modify. 
      // *Google:The child component then invokes this function, passing data as an argument, which allows the parent component to receive and update its state based on the child's actions.
      function updateFavorite(updatedPokemon) {
        //using setFavorite to track it down and render when it is being changed. 
        setFavorites((prevFavorites) => {
          const isAlreadyFavorite = prevFavorites.find((p) => p.name === updatedPokemon.name);
          
          if (isAlreadyFavorite) {
            //Filter is used remove the pokemons that already in the list and returns a new array containing all elemnts that pass the test. Hence we want to return a new array refelcting the updated pokemone list. 
            return prevFavorites.filter((p) => p.name !== updatedPokemon.name);
          } else {
            //update the list using the spread operate and add the new pokemon onto the list 
            return [...prevFavorites, updatedPokemon];
          }
        });
      }

      const filteredPokemon = pokemon.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

    return (
        <div>
          <h1>Pokédex</h1>
          {/* //!pass down updateSearch as a call back function and pass down search  */}
          <Search search={search} updateSearch={updateSearch} />
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              <PokemonList filteredPokemon={filteredPokemon} updateFavorite={updateFavorite} />
              <Favorites favorites={favorites} updateFavorite={updateFavorite} />
            </>
          )}
        </div>
      );
}

export default HomePage