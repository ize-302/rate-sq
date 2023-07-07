import { supabase } from "@/supabase";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/constants";
import { generateToken, handleTokenVerification } from "@/utils/jwt.utils";

export default async function updateProfileHandler(
  req,
  res
) {
  if (req.method === 'PUT') {
    // TODO; FIX issue with generateToken returning null
    // const { display_name } = req.body
    try {
      const isAuthorized = await handleTokenVerification(req, res)
      if (isAuthorized) {
        // const founduser = await supabase
        //   .from("profiles")
        //   .update({ display_name }).eq("id", isAuthorized.id).select("*")
        // const access_token = await generateToken(founduser.data, ACCESS_TOKEN)
        // const refresh_token = await generateToken(founduser.data, REFRESH_TOKEN)
        // console.log('--', access_token, refresh_token, founduser.data)
        // return res.status(200).send({ refresh_token, access_token })
        return res.status(201)
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Something went wrong' })
    }
  }
}