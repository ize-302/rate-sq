import { createMocks } from "node-mocks-http";
import composersHandler from '@/pages/api/v1/composers/index';

describe('/api/v1/composers', () => {
  it('should return 200 status code and paginated result', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        q: 'ramin'
      }
    });
    await composersHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        items: expect.any(Array),
      }),
    );
  });
});
