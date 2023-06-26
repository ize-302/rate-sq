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
      if (data) return res.status(409).send({ error: 'Account already exist' })
      // continue 
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hashSync(password, salt);
      await supabase.from('profiles').insert([
        { email, display_name, password: hash, salt }
      ]).select("*")
        .single();
      // delete test-user-again@example.com user after testing
      if (email === 'test-user-again@example.com') {
        await supabase.from('profiles').delete().eq("email", email)
          .single();
      }
      res.status(200).send({ message: 'Account has been created. Log in to continue' })
    } catch (error) {
      console.log(error)
      res.status(500).send({ error: 'Something went wrong' })
    }
  }
}