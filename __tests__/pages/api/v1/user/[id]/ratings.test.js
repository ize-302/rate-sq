import { createMocks } from "node-mocks-http";
import userRatingsHandler from '@/pages/api/v1/user/[id]/ratings';

describe('/api/v1/user/:id/ratings', () => {
  // Fetch user's contributed ratings
  it('Returns 200 status', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '9efe130b-edf0-40b5-9079-95768a1a02ca'
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await userRatingsHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        items: expect.any(Object),
      }),
    );
  }, 10000)
});