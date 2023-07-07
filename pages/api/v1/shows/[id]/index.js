import sql from "@/neondb";
import { fillShowData } from "@/pages/api/v1/utils";

export default async function showHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const { id } = req.query
    try {
      const shows = await sql`SELECT * FROM shows WHERE id = ${id}`;
      if (shows.length === 0) return res.status(404).send({ error: 'Show not found' })
      const result = await fillShowData({ data: shows })
      return res.status(200).send(result[0])
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}