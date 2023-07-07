import sql from "@/neondb";
import { getPagination, paginator } from "@/utils";
import { fillRatingData } from '@/pages/api/v1/utils'

export default async function userRatingsHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page)
    const per_page = Number(req.query.per_page)
    const { from, to } = getPagination({ page, per_page });
    const { id } = req.query

    try {
      const ratings = await sql`SELECT * FROM ratings WHERE author=${id} ORDER BY updated_at desc OFFSET ${from} LIMIT ${to}`
      const result = await fillRatingData({ data: ratings })
      return await res.status(200).send({
        items: result,
        ...paginator({ count: ratings.length, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}