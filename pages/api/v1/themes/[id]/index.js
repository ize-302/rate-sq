import { supabase } from "@/supabase";

export default async function themeHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const { id } = req.query
    try {
      const foundtheme = await supabase
        .from("themes")
        .select()
        .eq("id", id)
        .single();
      if (foundtheme.error) return res.status(404).send({ error: 'Theme not found' })
      return res.status(200).send(foundtheme.data)
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}