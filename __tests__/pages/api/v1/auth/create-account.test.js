import { createMocks } from "node-mocks-http";
import signupHandler from '@/pages/api/v1/auth/signup';

describe('/api/v1/auth/signup', () => {
  it('should return 409 status code, with error', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test-user@example.com',
        display_name: 'OstRater',
        password: '1234'
      }
    });
    await signupHandler(req, res);
    expect(res._getStatusCode()).toBe(409);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });


  it('should return 200 status code with message', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        email: 'test-user-again@example.com',
        display_name: 'OstRater',
        password: 'password'
      }
    });
    await signupHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        message: expect.any(String),
      }),
    );
  });
});
