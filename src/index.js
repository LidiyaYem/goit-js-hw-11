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
      return `<div class="photo-card"><a href="${largeImageURL}" alt="${tags}"></a>
      <img src="${webformatURL}" alt="${tags} width = "20" height = "180" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
    </div>`;
  }).join('');    

  gall.innerHTML = markup;
  button.classList.remove("hidden");
}

input.addEventListener('click', onButtonClick);
