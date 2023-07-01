import axios from 'axios'

export default async function mediaHandler(
  req,
  res
) {
  const { id, media_type } = req.query
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}`, {
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
