import sql from "@/neondb";
import { getPagination, paginator, fillRatingData } from "@/utils";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "@/utils/constants";

export default async function userRatingsHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page) || DEFAULT_PAGE
    const per_page = Number(req.query.per_page) || DEFAULT_PER_PAGE
    const { from, to } = getPagination({ page, per_page });
    const { id } = req.query

    try {
      const ratings = await sql`SELECT * FROM ratings WHERE author=${id} ORDER BY updated_at desc OFFSET ${from} LIMIT ${to}`
      const result = await fillRatingData({ data: ratings })
      return res.status(200).send({
        items: result,
        ...paginator({ count: ratings.length, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}