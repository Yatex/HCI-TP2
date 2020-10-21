import { Api } from './api.js';

export { CategoryApi };

class CategoryApi {
  static get url() {
    return `${Api.baseUrl}/categories`;
  }

  static async getAll(controller) {
    let res = await Api.get(CategoryApi.url, true, {
      page: 0,
      size: 10
    }, controller);

    return res.results;
  }

}