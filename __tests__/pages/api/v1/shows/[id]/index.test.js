import { createMocks } from "node-mocks-http";
import showHandler from "@/pages/api/v1/shows/[id]";

describe('/api/v1/shows/:id', () => {
  // fetch non existent theme
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
    await showHandler(req, res);
    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // fetch a theme information
  it('Returns 200 status code and show information', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: '95403'
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await showHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.any(Object),
    );
  })
});

