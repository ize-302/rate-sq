import { supabase } from "@/supabase";
import { handleTokenVerification } from "@/utils/jwt.utils";

export default async function trackHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const { id } = req.query
    try {
      await handleTokenVerification(req, res)
      const foundtrack = await supabase
        .from("tracks")
        .select()
        .eq("id", id)
        .single();
      if (foundtrack.error) return res.status(404).send({ error: 'Track not found' })
      res.status(200).send(foundtrack.data)
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}