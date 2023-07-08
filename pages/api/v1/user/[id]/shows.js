import sql from "@/neondb";
import { getPagination, paginator } from "@/utils";
import { fillShowData } from "@/helpers";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/utils/constants";

export default async function userShowsHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || DEFAULT_PAGE
    const per_page = Number(req.query.per_page) || DEFAULT_PER_PAGE
    const { from, to } = getPagination({ page, per_page });
    const { id } = req.query

    try {
      const shows = await sql`SELECT * FROM shows WHERE added_by=${id} ORDER BY created_at desc OFFSET ${from} LIMIT ${to}`
      const results = await fillShowData({ data: shows })
      return await res.status(200).send({
        items: results,
        ...paginator({ count: shows.length, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}