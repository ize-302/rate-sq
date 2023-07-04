import { supabase } from '@/supabase'
import { filldata } from '@/utils';
import axios from 'axios';

export default async function searchHandler(
  req,
  res
) {
  const query = req.query.query ? req.query.query : ''
  try {
    const foundtitles = await supabase.from('titles')
      .select()
      .textSearch('name', query, {
        type: 'websearch'
      })

    const results = await filldata({ data: foundtitles.data })

    return res.status(200).send({ items: results })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: 'Something went wrong' })
  }
}