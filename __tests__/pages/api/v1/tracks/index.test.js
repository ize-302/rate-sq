import { createMocks } from "node-mocks-http";
import tracksHandler from '@/pages/api/v1/tracks';

describe('/api/v1/tracks', () => {
  // FETCH tracks
  // it('Returns 200 status code and array of tracks', async () => {
  //   const { req, res } = createMocks({
  //     method: 'GET',
  //   });
  //   await tracksHandler(req, res);
  //   expect(res._getStatusCode()).toBe(200);
  //   expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
  //     expect.objectContaining({
  //       items: expect.any(Array),
  //     }),
  //   );
  // })

  // TRACK CREATION
  it('Returns 400 status code error and error message when some fields are missing', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        title: 'kolade the mosquito',
        media_path: '',
        composers: ['ramin-djawadi'],
        related_film: ''
      }
    });
    await tracksHandler(req, res);
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
        title: 'kolade the mosquito',
        media_path: 'https://youtu.be/YFhxQ8kmJw0',
        composers: ['ramin-djawadi'],
        related_film: 'dadasd'
      }
    });
    await tracksHandler(req, res);
    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(JSON.stringify(res._getData()))).toEqual(
      expect.objectContaining({
        success: expect.any(String),
      }),
    );
  })
});
