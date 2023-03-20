import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchImages} from './axios.js';

const input = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');


input.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    // resetInput();
    e.preventDefault();
    const searchedImage = e.target.elements.searchQuery.value.trim();
    console.log(searchedImage);

    fetchImages(searchedImage)
    .then(renderImage(searchedImage));
    // (searchedImage => {
      //   if (searchedImage = []) {
      //   Notify.info(
      //     'Sorry, there are no images matching your search query. Please try again.'
      //   );
      // } else {
        
}
// })
// };

// function resetInput() {
//   refs.input.innerHTML = '';
//   refs.gallery.innerHTML = '';
// }

function renderImage (searchedImage) {
  const markup = searchedImage
  .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<a href="${largeImageURL}" alt="${tags}"><div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views ${views}</b>
        </p>
        <p class="info-item">
          <b>Comments ${comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads ${downloads}</b>
        </p>
      </div>
    </div></a>`;
  }).join('');    

  gallery.innerHTML = markup;
  // refs.input.innerHTML = '';
}