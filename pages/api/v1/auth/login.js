import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { generateToken } from "@/utils/jwt.utils";
import bcrypt from 'bcrypt'
import sql from "@/neondb";

export default async function loginHandler(
  req,
  res
) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    try {
      const errorMessage = 'Incorrect login details, try again'

      const users = await sql`SELECT * FROM users WHERE email=${email}`
      if (users.length === 0) return res.status(401).send({ error: errorMessage })

      const match = await bcrypt.compare(password, users[0]['password']);
      if (!match) return res.status(401).send({ error: errorMessage })
      // generate new salt
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);

      // update user
      await sql`UPDATE users SET password = ${hash}, salt = ${salt} WHERE email = ${email}`

      // generate token
      const access_token = await generateToken(users[0], ACCESS_TOKEN)
      const refresh_token = await generateToken(users[0], REFRESH_TOKEN)

      return res.status(200).send({ refresh_token, access_token })
    } catch (error) {
      console.log('err->', error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}
