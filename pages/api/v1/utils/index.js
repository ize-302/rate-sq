/* istanbul ignore file */
import sql from "@/neondb";
import axios from "axios";

export const fillTitleData = async ({ data }) => {
  const result = await Promise.all(
    data.map(async item => {
      const themoviedb_response = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
        }
      })
      const ratings = await sql`SELECT * FROM ratings WHERE show_id = ${item.id}`;
      const titles = await sql`SELECT * FROM titles WHERE id = ${item.id}`;
      let total_responses = 0
      let total_ratings = 0
      let average_rating = 0
      Array(5).fill(1, 1, 5).map((n, i) => {
        const occurence = ratings.filter(item => Number(item.rating) === i + 1).length
        total_responses = total_responses + occurence
        total_ratings = total_ratings + ((i + 1) * occurence)
      })
      average_rating = Number((total_ratings / total_responses).toFixed(1))
      const data_obj = {
        id: themoviedb_response.data.id,
        name: item.name,
        backdrop_path: themoviedb_response.data.backdrop_path,
        poster_path: themoviedb_response.data.poster_path,
        embed_code: titles[0] ? titles[0].embed_code : null,
        added_by: item.added_by,
        ratings: average_rating,
        exists: !titles[0] ? false : true
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


export const fillRatingData = async ({ data }) => {
  const result = await Promise.all(
    data.map(async item => {
      const themoviedb_response = await axios.get(`https://api.themoviedb.org/3/tv/${item.show_id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
        }
      })
      const profiles = await sql`SELECT FROM profiles WHERE id=${item.author}`
      const data_obj = {
        ...item,
        show: {
          id: themoviedb_response.data.id,
          name: themoviedb_response.data.original_name,
          poster_path: themoviedb_response.data.poster_path,
        },
        author: {
          id: profiles[0].id,
          display_name: profiles[0].display_name,
        }
      }
      return data_obj
    })
  )
  return result
}