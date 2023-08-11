import { UnsplashApi } from './unsplash-api';
import { createGalleryMarkup } from './markup';

const unsplashApi = new UnsplashApi(12);


const refs = {
    form: document.querySelector('.js-search-form'),
    container: document.querySelector('.js-gallery'),
    loadButton: document.querySelector('.js-load-more'),
    loader: document.querySelector('.loader'),
};


refs.form.addEventListener('submit', onSubmit);
refs.loadButton.addEventListener('click', onLoadMoreBtnClick);

function onSubmit(event) {
    event.preventDefault();

    unsplashApi.page = 1;
    const searchQuery = event.currentTarget.elements["search-query"].value.trim();

    if (!searchQuery) {
        return alert('Please, write something');
    }

    unsplashApi.query = searchQuery;

    refs.loader.classList.remove('is-hidden');

    unsplashApi.fetchPhotosByQuery()
        .then((response) => {
            refs.container.innerHTML = createGalleryMarkup(response.results);

            if (response.total < unsplashApi.per_page) {
                return;
            } else {
                refs.loadButton.classList.remove('is-hidden');
            }

        })
        .catch(error => console.log(error))
        .finally(() => refs.loader.classList.add('is-hidden'));
}

function onLoadMoreBtnClick() {
    unsplashApi.page += 1;

    refs.loader.classList.remove('is-hidden');
    refs.container.classList.add('is-hidden');
    refs.loadButton.classList.add('is-hidden');

    unsplashApi.fetchPhotosByQuery()
        .then((response) => {
            refs.container.insertAdjacentHTML("beforeend", createGalleryMarkup(response.results));

            if (response.total_pages === unsplashApi.page) {
                refs.loadButton.classList.add('is-hidden');
            }
        })
        .catch(error => console.log(error))
        .finally(() => {
            refs.loader.classList.add('is-hidden');
            refs.container.classList.remove('is-hidden');
            refs.loadButton.classList.remove('is-hidden');
        });
}

