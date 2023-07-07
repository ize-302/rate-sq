import sql from "@/neondb";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { generateToken, handleTokenVerification } from "@/utils/jwt.utils";

export default async function updateProfileHandler(
  req,
  res
) {
  if (req.method === 'PUT') {
    // TODO; FIX issue with generateToken returning null 
    const { display_name } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (isAuthorized) {
        const users = await sql`UPDATE profiles SET display_name = ${display_name} WHERE id = ${isAuthorized.id} RETURNING *`
        const access_token = await generateToken(users[0], ACCESS_TOKEN)
        const refresh_token = await generateToken(users[0], REFRESH_TOKEN)
        return res.status(200).send({ refresh_token, access_token })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}