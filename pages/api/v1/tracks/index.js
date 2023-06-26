import { supabase } from "@/supabase";
import { handleTokenVerification } from "@/utils/jwt.utils";

export default async function tracksHandler(
  req,
  res
) {
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
      res.status(201).send({ success: 'track successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}