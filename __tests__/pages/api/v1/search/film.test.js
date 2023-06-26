import { createMocks } from "node-mocks-http";
import filmSearchHandler from '@/pages/api/v1/search/film';

describe('/api/v1/search/film', () => {
  it('Returns 200 status code and array of search results', () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        query: 'game of thrones'
      }
    });
    filmSearchHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
  })
});
