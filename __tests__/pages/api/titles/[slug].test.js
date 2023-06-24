import { createMocks } from "node-mocks-http";
import titleHandler from '@/pages/api/v1/titles/[slug]'

describe('/api/v1/titles/:slug', () => {
  it('should return 404 status code', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        slug: 'asda'
      }
    });
    await titleHandler(req, res);
    expect(res._getStatusCode()).toBe(404);
  });

  it('should return 200 status code and object', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        slug: 'westworld'
      }
    });
    await titleHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.any(Object),
    );
  });
});