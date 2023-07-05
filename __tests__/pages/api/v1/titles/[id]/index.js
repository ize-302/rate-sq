import { createMocks } from "node-mocks-http";
import titleHandler from "@/pages/api/v1/titles/[id]";
import { supabase } from "@/supabase";

describe('/api/v1/titles/:id', () => {
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
    await titleHandler(req, res);
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
        id: 125988
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await titleHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.any(Object),
    );
  })
});

