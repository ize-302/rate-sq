import sql from "@/neondb";

export default async function userHasRatedHandler(
  req,
  res
) {
  if (req.method === 'GET') {
    const { id, user_id } = req.query
    try {
      const ratings = await sql`SELECT * FROM ratings WHERE author=${user_id} AND show_id=${id}`;
      return res.status(200).send({ israted: ratings.length > 0 ? true : false })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}