import titles from '@/db/titles.json'
import composers from '@/db/composers.json'
import { paginator } from "@/utils"

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function composerTitlesHandler(
  req,
  res
) {
  // check if composer exists
  const foundcomposer = composers.find(composer => composer.slug === req.query.slug)
  if (foundcomposer) {
    const gettitles = titles.filter(title => title.music_by.includes(req.query.slug))
    const result = paginator(gettitles, 1, 10)
    res.status(200).send(result)
  } else {
    res
      .status(404)
      .send({ message: 'composer does not exist' })
  }

}