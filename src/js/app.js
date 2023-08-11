import { UnsplashApi } from './unsplash-api';

const unsplashApi = new UnsplashApi();

unsplashApi.query = 'car';

unsplashApi.fetchPhotosByQuery().then(console.log);
