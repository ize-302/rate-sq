import axios from 'axios'

export default async function trendingMoviesHandler(
  req,
  res
) {
  try {
    const { page } = req.query
    const response = await axios.get(`https://api.themoviedb.org/3/trending/tv/day?include_adult=false&language=en-US&page=${page}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
      }
    })
    return res.status(200).send(response.data)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Something went wrong' })
  }
}