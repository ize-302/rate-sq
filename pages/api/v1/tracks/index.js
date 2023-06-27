import { supabase } from "@/supabase";
import { paginator } from "@/utils";
import { handleTokenVerification } from "@/utils/jwt.utils";

export default async function tracksHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    try {
      await handleTokenVerification(req, res)
      const { page, perpage } = req.query
      const foundtracks = await supabase
        .from("tracks")
        .select().order('created_at', { ascending: false })
      return res.status(200).send(paginator(!foundtracks.data ? [] : foundtracks.data, Number(page), Number(perpage)))
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }

  }
  if (req.method === 'POST') {
    const { title, media_path, composers, related_film } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (!title || !media_path || !related_film) {
        return res.status(400).send({ error: 'Required fields missing' })
      }
      await supabase.from('tracks').insert([
        { title, media_path, composers, related_film, added_by: isAuthorized.id }
      ]).select("*")
        .single();
      return res.status(201).send({ success: 'track successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}