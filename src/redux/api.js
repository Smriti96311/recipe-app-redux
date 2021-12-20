import axios from 'axios';


const APP_ID = "e820f98f";
const APP_KEY = "0f56dca50d4027ebdc3ad2caa755f3e4";


export const getRecipes = async (query) => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;

    return await axios.get(url);

}