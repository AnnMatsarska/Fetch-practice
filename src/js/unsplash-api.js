export class UnsplashApi {
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

  #BASE_URL = 'https://api.unsplash.com';

  constructor() {
    this.page = 1;
    this.query = null;
  }

  fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      query: this.query,
      page: this.page,
      per_page: 12,
      client_id: this.#API_KEY,
    });
    return fetch(`${this.#BASE_URL}/search/photos/?${searchParams}`).then(
      resp => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      }
    );
  }
}
