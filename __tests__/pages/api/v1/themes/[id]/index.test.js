import { createMocks } from "node-mocks-http";
import themeHandler from "@/pages/api/v1/themes/[id]";
import { supabase } from "@/supabase";

describe('/api/v1/themes/:id', () => {
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
    await themeHandler(req, res);
    expect(res._getStatusCode()).toBe(404);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      }),
    );
  });

  // fetch a theme information
  it('Returns 200 status code and theme information', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        id: 'c4193ea0-25a2-4bb4-b6c9-4132bad3f972'
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await themeHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.any(Object),
    );
  })
});

