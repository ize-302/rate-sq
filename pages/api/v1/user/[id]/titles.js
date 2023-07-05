import { supabase } from "@/supabase";
import { fillTitleData, getPagination, paginator } from "@/utils";

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
      const foundtitles = await supabase
        .from("titles")
        .select("*", { count: "exact" }).eq("added_by", id)
        .order("created_at", { ascending: false })
        .range(from, to)
      const results = await fillTitleData({ data: foundtitles.data })
      return await res.status(200).send({
        items: results,
        ...paginator({ count: foundtitles.count, page, per_page, from, to })
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}