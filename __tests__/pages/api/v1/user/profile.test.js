import { createMocks } from "node-mocks-http";
import updateProfileHandler from '@/pages/api/v1/user/profile';

describe('/api/v1/user/profile', () => {
  // Update profile
  it('Returns 400 error when fields is incomplete', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        display_name: '',
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await updateProfileHandler(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  })

  it('Returns 200 status when fields are complete', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        display_name: 'ize',
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await updateProfileHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        refresh_token: expect.any(String),
      }),
    );
  }, 10000)


});