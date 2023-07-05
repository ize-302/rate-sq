import { supabase } from "@/supabase";
import { getPagination, paginator } from "@/utils";

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
      const foundratings = await supabase
        .from("ratings")
        .select("*", { count: "exact" }).eq("author", id)
        .order("updated_at", { ascending: false })
        .range(from, to)
      return await res.status(200).send({
        items: foundratings.data,
        ...paginator({ count: foundratings.count, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}