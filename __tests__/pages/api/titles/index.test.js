import { createMocks } from "node-mocks-http";
import titlesHandler from '@/pages/api/v1/titles/index';

describe('/api/v1/titles', () => {
  it('should return 200 status code and paginated result', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
    await titlesHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        items: expect.any(Array),
      }),
    );
  });
});
