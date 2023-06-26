import { createMocks } from "node-mocks-http";
import loginHandler from '@/pages/api/v1/auth/login';

describe('/api/v1/auth/login', () => {
  it('should return 401 status code, with message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test-user@example.com',
        password: 'passwordx'
      }
    });
    await loginHandler(req, res);
    expect(res._getStatusCode()).toBe(401);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });


  it('should return 200 status code, access and refresh token in response body', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test-user@example.com',
        password: 'password'
      }
    });
    await loginHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        access_token: expect.any(String),
        refresh_token: expect.any(String),
      }),
    );
  });
});
