import { supabase } from "@/supabase";
import bcrypt from 'bcrypt'

export default async function signupHandler(
  req,
  res
) {
  if (req.method === 'POST') {
    const { email, display_name, password } = req.body
    try {
      const { data } = await supabase
        .from("profiles")
        .select()
        .eq("email", email)
        .single();
      if (data) return res.status(400).send({ message: 'Account already exist' })
      // continue 
      const salt = bcrypt.genSaltSync(16);
      const hash = bcrypt.hashSync(password, salt);
      await supabase.from('profiles').insert([
        { email, display_name, password: hash, salt }
      ]).select("*")
        .single();
      res.status(201).send({ message: 'Account has been created' })
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: 'Something went wrong' })
    }
  }
}