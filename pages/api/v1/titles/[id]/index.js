import { supabase } from "@/supabase";
import { filldata } from "@/utils";

export default async function titleHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const { id } = req.query
    try {
      const foundtitle = await supabase
        .from("titles")
        .select()
        .eq("id", id)
        .single();
      if (foundtitle.error) return res.status(404).send({ error: 'Title not found' })
      const result = await filldata({ data: [foundtitle.data] })
      return res.status(200).send(result[0])
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}