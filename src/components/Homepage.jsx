// src/HomePage.js
import { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./PokemonList";
import Search from "./Search";
import Favorite from "./Favorite";

function HomePage () {
    const [search, setSearch] = useState('');
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
    

    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && (
                <div>
                    <Search search={search} setSearch={setSearch} />
                    <PokemonList pokemon={pokemon} search={search} addToFavorites={addToFavorites} />
                    <Favorites favorites={favorites} />
                </div>
            )}
        </div>
    );
}

export default HomePage