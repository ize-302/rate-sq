import { supabase } from "@/supabase";
import axios from "axios";

/* istanbul ignore file */
export const paginator = ({ count, page, per_page, from, to }) => {
  let total_pages = Math.ceil(count / per_page);
  return {
    page: page,
    per_page: per_page,
    prev_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: count.length,
    total_pages: total_pages,
    count,
    from, to
  };
}


export const getPagination = ({ page, per_page }) => {
  const limit = per_page;
  const from = (page ? page * limit : 0) - per_page;
  const to = page ? from + per_page - 1 : per_page - 1;
  return { from, to };
};

export const filldata = async ({ data }) => {
  const result = await Promise.all(
    data.map(async item => {
      const themoviedb_response = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
        }
      })
      const ratings = await supabase
        .from("ratings")
        .select()
        .eq("show_id", item.id)
      const title = await supabase
        .from("titles")
        .select().single()
        .eq("id", item.id)

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
      const data_obj = {
        // title_id: item.id,
        show_id: themoviedb_response.data.id,
        name: item.name,
        backdrop_path: themoviedb_response.data.backdrop_path,
        poster_path: themoviedb_response.data.poster_path,
        embed_code: title.data ? title.data.embed_code : null,
        added_by: item.added_by,
        ratings: average_rating,
        exists: title.error ? false : true
      }
      return data_obj
    })
  );
  return result.sort((a, b) => {
    if (b.exists && !a.exists) return 1
    if (!b.exists && a.exists) return -1;
    return 0;
  })
}