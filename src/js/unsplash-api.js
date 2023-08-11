export class UnsplashApi {
  #API_KEY = 'LxvKVGJqiSe6NcEVZOaLXC-f2JIIWZaq_o0WrF8mwJc';

  #BASE_URL = 'https://api.unsplash.com';

  constructor(perPage) {
    this.page = 1;
    this.query = null;
    this.per_page = perPage;
  }

  fetchPhotosByQuery() {
    const searchParams = new URLSearchParams({
      query: this.query,
      page: this.page,
      per_page: this.per_page,
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
