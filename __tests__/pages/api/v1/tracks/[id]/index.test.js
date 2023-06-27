import { createMocks } from "node-mocks-http";
import trackHandler from '@/pages/api/v1/tracks/[id]/index';

describe('/api/v1/tracks/:id', () => {
  // fetch no existent track
  it('should return 404 status code with error message', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 'xxx'
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await trackHandler(req, res);
    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // fetch a track information
  it('Returns 200 status code and track information', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '5d015a9d-52b3-42b2-adcc-61bae747f772'
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await trackHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.any(Object),
    );
  })
});
