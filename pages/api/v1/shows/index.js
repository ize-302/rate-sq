import sql from "@/neondb";
import { getPagination, paginator, fillShowData } from "@/utils";
import { handleTokenVerification } from "@/utils/jwt.utils";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/utils/constants";

export default async function showsHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || DEFAULT_PAGE
    const per_page = Number(req.query.per_page) || DEFAULT_PER_PAGE
    const { from, to } = getPagination({ page, per_page });

    try {
      const foundshows = await sql`SELECT * FROM shows ORDER BY created_at desc OFFSET ${from} LIMIT ${to}`
      const results = await fillShowData({ data: foundshows })
      return res.status(200).send({
        items: results,
        ...paginator({ count: foundshows.count, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }

  if (req.method === 'POST') {
    const { embed_code, id, name, } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (!embed_code || !id || !name) {
        return res.status(400).send({ error: 'Required fields missing' })
      }

      await sql`INSERT INTO shows (id, name, embed_code, added_by) VALUES (${id}, ${name}, ${embed_code}, ${isAuthorized.id})`

      // deletes show created via test
      if (id === 'test-id') {
        await sql`DELETE FROM shows WHERE id = ${id}`
      }
      return res.status(201).send({ success: 'show successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}