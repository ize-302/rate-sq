import axios from 'axios'

export default async function composerSearchHandler(
  req,
  res
) {
  const { query } = req.query
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
      }
    })
    res.status(200).send(response.data)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Something went wrong' })
  }
}