import { createMocks } from "node-mocks-http";
import composerTitlesHandler from '@/pages/api/v1/composers/[slug]/titles'

describe('/api/v1/composers/:slug/titles', () => {
  it('should return 404 status code', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        slug: 'sda'
      }
    });
    await composerTitlesHandler(req, res);
    expect(res._getStatusCode()).toBe(404);
  });

  it('should return 200 status code and object', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        slug: 'ramin-djawadi'
      }
    });
    await composerTitlesHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.any(Object),
    );
  });
});