import { supabase } from "@/supabase";
import { filldata, getPagination, paginator } from "@/utils";
import { handleTokenVerification } from "@/utils/jwt.utils";

export default async function titlesHandler(
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
        .order("created_at", { ascending: false })
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

  if (req.method === 'POST') {
    const { embed_code, id, name, } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (!embed_code || !id || !name) {
        return res.status(400).send({ error: 'Required fields missing' })
      }

      await supabase.from('titles').insert([
        { embed_code, id, name, added_by: isAuthorized.id }

      ]).select("*")
        .single();
      if (id === 'test-id') {
        await supabase.from('titles').delete().eq("id", id)
          .single();
      }
      return res.status(201).send({ success: 'title successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}