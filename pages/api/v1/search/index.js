import { fillShowData } from '@/utils'
import axios from 'axios'

export default async function filmSearchHandler(
  req,
  res
) {
  const { query } = req.query
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
      }
    })
    const filtered = response.data.results.filter(item => item.media_type === 'tv')
    const results = await fillShowData({ data: filtered })
    return res.status(200).send({ items: results })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Something went wrong' })
  }
}