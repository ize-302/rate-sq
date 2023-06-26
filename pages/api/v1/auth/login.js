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
      const errorMessage = 'Incorrect login details, try again'
      if (!founduser.data) return res.status(401).send({ error: errorMessage })
      // continue 
      const match = await bcrypt.compare(password, founduser.data.password);
      if (!match) return res.status(401).send({ error: errorMessage })
      // // generate new salt
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);
      await supabase.from('profiles').update(
        { password: hash, salt }
      ).eq("email", email)
      // generate token
      const access_token = await generateToken(founduser.data, ACCESS_TOKEN)
      const refresh_token = await generateToken(founduser.data, REFRESH_TOKEN)
      return res.status(200).send({ refresh_token, access_token })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}