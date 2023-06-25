import { supabase } from "@/supabase";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { generateToken } from "@/utils/jwt.utils";
import bcrypt from 'bcrypt'

export default async function loginHandler(
  req,
  res
) {
  if (req.method === 'POST') {
    const { email, password } = req.body
    try {
      const founduser = await supabase
        .from("profiles")
        .select()
        .eq("email", email)
        .single();
      if (!founduser.data) return res.status(404).send({ message: 'Account does not exist' })
      // continue 
      const match = await bcrypt.compare(password, founduser.data.password);
      if (!match) return res.status(401).send({ message: 'Account details incorrect' })
      // generate new salt
      const salt = bcrypt.genSaltSync(16);
      const hash = bcrypt.hashSync(password, salt);
      await supabase.from('profiles').update(
        { password: hash, salt }
      ).eq("email", email)
      // generate token
      const access_token = generateToken(founduser.data, ACCESS_TOKEN)
      const refresh_token = generateToken(founduser.data, REFRESH_TOKEN)
      return res.status(200).send({ refresh_token, access_token })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: 'Something went wrong' })
    }
  }
}