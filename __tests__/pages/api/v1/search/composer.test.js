import { createMocks } from "node-mocks-http";
import composerSearchHandler from '@/pages/api/v1/search/composer';

describe('/api/v1/search/composer', () => {
  it('Returns 200 status code and array of search results', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        query: 'ramin djawadi'
      }
    });
    composerSearchHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
  })
});
