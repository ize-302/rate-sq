/* istanbul ignore file */
import sql from "@/neondb";
import axios from "axios";

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


export const fillShowData = async ({ data }) => {
  const result = await Promise.all(
    data.map(async item => {
      const themoviedb_response = await axios.get(`https://api.themoviedb.org/3/tv/${item.id}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_THEMOVIEDB_ACCESS_TOKEN}`
        }
      })
      const shows = await sql`SELECT * FROM shows WHERE id = ${item.id}`;

      // we want to calculate the averate rating for a specific show
      const ratings = await sql`SELECT * FROM ratings WHERE show_id = ${item.id}`;
      let total_responses = 0
      let total_ratings = 0
      let average_rating = 0
      // since the ratings are between the range 1-5, we iterate within that rang and get the occurence for each rate item
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
        embed_code: shows[0] ? shows[0].embed_code : null,
        added_by: item.added_by,
        ratings: average_rating,
        exists: !shows[0] ? false : true
      }
      return data_obj
    })
  )
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
      const users = await sql`SELECT * FROM users WHERE id=${item.author}`
      const data_obj = {
        ...item,
        show: {
          id: themoviedb_response.data.id,
          name: themoviedb_response.data.original_name,
          poster_path: themoviedb_response.data.poster_path,
        },
        author: {
          id: users[0].id,
          display_name: users[0].display_name,
        }
      }
      return data_obj
    })
  )
  return result
}