import sql from "@/neondb";
import { getPagination, paginator } from "@/utils";
import { fillTitleData } from "@/pages/api/v1/utils";

export default async function userTitlesHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page)
    const per_page = Number(req.query.per_page)
    const { from, to } = getPagination({ page, per_page });
    const { id } = req.query

    try {
      const titles = await sql`SELECT * FROM titles WHERE added_by=${id} ORDER BY created_at desc OFFSET ${from} LIMIT ${to}`
      const results = await fillTitleData({ data: titles })
      return await res.status(200).send({
        items: results,
        ...paginator({ count: titles.length, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}