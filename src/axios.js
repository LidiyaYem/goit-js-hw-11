import axios from 'axios'; 

export {fetchImages};
export const input = document.querySelector('#search-form');
export const searchedImage = input.value; 

const BASE_URL = `https://pixabay.com/api/`;
const KEY = `34573956-5b25d4fd80103ca84cba18460`;
let limit = 40;
let page = 0;

async function fetchImages(searchedImage) {
    page += 1;
    try {
    const response = await axios.get(`${BASE_URL}`, {

    params: {
        key: `${KEY}`,
        q: `${searchedImage}`,
        image_type: `photo`,
        orientation: `orientation`,
        safesearch: `true`,
        per_page: limit,
        page: page
    }
});
    return response.data.hits;
    } catch (error) {
        console.log(error);
}
    }