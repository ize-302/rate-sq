import { createMocks } from "node-mocks-http";
import themesHandler from '@/pages/api/v1/themes';


describe('/api/v1/themes', () => {
  // ADD A THEME
  it('Returns 400 status code error and error message when some fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        themoviedb_id: 'id here',
        theme_url: '',
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await themesHandler(req, res);
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
        themoviedb_id: 'test-movie-db-id',
        theme_url: 'url here',
      },
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
      }
    });
    await themesHandler(req, res);
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        success: expect.any(String),
      }),
    );
  })

});