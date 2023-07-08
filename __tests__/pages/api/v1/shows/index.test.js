import { createMocks } from "node-mocks-http";
import showsHandler from '@/pages/api/v1/shows';


describe('/api/v1/shows', () => {
  // ADD A THEME
  it('Returns 400 status code error and error message when some fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'test-id',
        name: '',
        embed_code: ''
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await showsHandler(req, res);
    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  })


  it('Creates a track and returns 201 status code and success message when all fields are availble', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        id: 'test-id',
        name: 'name here',
        embed_code: 'embed_code here'
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await showsHandler(req, res);
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        success: expect.any(String),
      }),
    );
  })

  it('Return 200 error and list of shows', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    });
    await showsHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        items: expect.any(Object),
      }),
    );
  })
});