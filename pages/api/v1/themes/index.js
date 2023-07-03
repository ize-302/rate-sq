import { supabase } from "@/supabase";
import { handleTokenVerification } from "@/utils/jwt.utils";

export default async function themesHandler(
  req,
  res
) {
  if (req.method === 'POST') {
    const { themoviedb_id, theme_url } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (!themoviedb_id || !theme_url) {
        return res.status(400).send({ error: 'Required fields missing' })
      }
      await supabase.from('themes').insert([
        { themoviedb_id, theme_url, added_by: isAuthorized.id }
      ]).select("*")
        .single();
      // delete ttest-movie-db-id user after testing
      await supabase.from('themes').delete().eq("themoviedb_id", 'test-movie-db-id')
        .single();
      return res.status(201).send({ success: 'theme successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}