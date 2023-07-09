import { handleTokenVerification } from "@/utils/jwt.utils";
import sql from "@/neondb";
import { v4 as uuidv4 } from 'uuid';
import { fillRatingData } from "@/utils";

export default async function showRatingsHandler(
  req,
  res
) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const shows = await sql`SELECT * FROM shows WHERE id=${id}`
      if (shows.length === 0) return res.status(404).send({ error: 'Show not found' })
      const ratings = await sql`SELECT * FROM ratings WHERE show_id=${id} ORDER BY updated_at desc`
      const result = await fillRatingData({ data: ratings })
      return res.status(200).send({
        items: result
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }

  if (req.method === 'POST') {
    const { rating, comment, } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (!rating) {
        return res.status(400).send({ error: 'Required fields missing' })
      }

      const uid = await uuidv4() // generate id for rating
      await sql`INSERT INTO ratings (id, rating, show_id, comment, author) VALUES (${uid}, ${Number(rating)}, ${Number(id)}, ${comment}, ${isAuthorized.id})`

      // deletes show ratings created during test
      if (id === 1) {
        await sql`DELETE FROM ratings WHERE show_id = ${id}`
      }
      return res.status(201).send({ success: 'Rating successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}