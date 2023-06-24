import composers from '@/db/composers.json'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function composerHandler(
  req,
  res
) {
  const findcomposer = composers.find(composer => composer.slug === req.query.slug)
  if (findcomposer) {
    res.status(200).send(findcomposer)
  } else res
    .status(404)
    .send({ message: 'composer not found' })
}