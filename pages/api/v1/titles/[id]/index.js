import sql from "@/neondb";
import { fillTitleData } from "@/pages/api/v1/utils";

export default async function titleHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const { id } = req.query
    try {
      const titles = await sql`SELECT * FROM titles WHERE id = ${id}`;
      if (titles.length === 0) return res.status(404).send({ error: 'Title not found' })
      const result = await fillTitleData({ data: titles })
      return res.status(200).send(result[0])
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}