// import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {fetchImages} from './axios.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const input = document.querySelector('#search-form');
const gall = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

let gallery = new SimpleLightbox('.gallery a', {
  captionType: 'attr',
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

gallery.on('show.simplelightbox');

input.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    const searchedImage = e.target.elements.searchQuery.value.trim();
    console.log(searchedImage);

    fetchImages(searchedImage)
    .then(searchedImage => {
        if (!searchedImage) {
        Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        renderImage(searchedImage);
}
})
}

function renderImage (searchedImage) {
  const markup = searchedImage
  .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<a href="${largeImageURL}" alt="${tags}"><div class="photo-card">
      <img src="${webformatURL}" alt="${tags} width = "100" height = "200" loading="lazy" />
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

  gall.innerHTML = markup;
  input.innerHTML = '';

  button.classList.remove("hidden");

}

input.addEventListener('click', onButtonClick);
