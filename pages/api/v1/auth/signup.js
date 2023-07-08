import sql from '@/neondb';
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

export default async function signupHandler(
  req,
  res
) {
  if (req.method === 'POST') {
    const { email, display_name, password } = req.body
    try {
      // does user already exist in users table?
      const users = await sql`SELECT * FROM users WHERE email = ${email}`;
      if (users.length > 0) return res.status(409).send({ error: 'Account already exist' })

      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);
      const id = await uuidv4()
      await sql`INSERT INTO users (id, email, display_name, password, salt) VALUES (${id}, ${email}, ${display_name}, ${hash}, ${salt})`;

      // deletes account created via test
      if (email === 'test-user-again@example.com') {
        await sql`DELETE FROM users WHERE email = ${email}`
      }

      res.status(200).send({ success: 'Account has been created. Log in to continue' })
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Something went wrong' })
    }
  }
}