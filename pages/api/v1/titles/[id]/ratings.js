import { supabase } from "@/supabase";
import { fillRatingData } from "@/utils";
import { handleTokenVerification } from "@/utils/jwt.utils";

export default async function titleRatingsHandler(
  req,
  res
) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const foundratings = await supabase
        .from("ratings")
        .select("*", { count: "exact" })
        .eq("show_id", id)
        .order("updated_at", { ascending: false })
      const result = await fillRatingData({ data: foundratings.data })
      return await res.status(200).send({
        items: result
      })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }

  if (req.method === 'POST') {
    const { rating, comment, } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (!rating) {
        return res.status(400).send({ error: 'Required fields missing' })
      }

      await supabase.from('ratings').insert([
        { rating: Number(rating), show_id: Number(id), comment, author: isAuthorized?.id }
      ]).select("*")
        .single();
      // delete test data
      if (id === 1) {
        await supabase.from('ratings').delete().eq("show_id", id)
          .single();
      }
      return res.status(201).send({ success: 'Rating successfully added' })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}