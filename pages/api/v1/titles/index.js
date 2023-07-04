import { supabase } from "@/supabase";
import { paginator } from "@/utils";
import axios from "axios";

export default async function themeHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const page = Number(req.query.page)
    const per_page = Number(req.query.per_page)

    const getPagination = () => {
      const limit = per_page;
      const from = (page ? page * limit : 0) - per_page;
      const to = page ? from + per_page - 1 : per_page - 1;
      return { from, to };
    };

    const { from, to } = getPagination();

    try {
      const foundtitles = await supabase
        .from("titles")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: true })
        .range(from, to)
      const results = await Promise.all(
        foundtitles.data.map(async title => {
          const themoviedb_response = await axios.get(`https://api.themoviedb.org/3/tv/${title.show_id}`, {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
            }
          })
          const ratings = await supabase
            .from("ratings")
            .select()
            .eq("title_id", title.id)
          // calculating average rating
          // avg ratings = sum of all ratings / number of responses
          let total_responses = 0
          let total_ratings = 0
          let average_rating = 0
          Array(5).fill(1).map((n, i) => {
            const occurence = ratings.data.filter(item => Number(item.rating) === i + 1).length
            total_responses = total_responses + occurence
            total_ratings = total_ratings + ((i + 1) * occurence)
          })
          average_rating = Number((total_ratings / total_responses).toFixed(1))

          return {
            title_id: title.id,
            show_id: themoviedb_response.data.id,
            name: themoviedb_response.data.original_name,
            backdrop_path: themoviedb_response.data.backdrop_path,
            poster_path: themoviedb_response.data.poster_path,
            embed_id: title.embed_id,
            added_by: title.added_by,
            ratings: average_rating,
          }
        })
      );
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