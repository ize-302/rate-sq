import { supabase } from "@/supabase";
import { filldata, getPagination, paginator } from "@/utils";

export default async function themeHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page)
    const per_page = Number(req.query.per_page)

    const { from, to } = getPagination({ page, per_page });

    try {
      const foundtitles = await supabase
        .from("titles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: true })
        .range(from, to)
      const results = await filldata({ data: foundtitles.data })
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