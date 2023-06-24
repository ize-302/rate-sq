import titles from '@/db/titles.json'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function titleHandler(
  req,
  res
) {
  const findtitle = titles.find(title => title.slug === req.query.slug)
  if (findtitle) {
    res.status(200).send(findtitle)
  } else res
    .status(404)
    .send({ message: 'title not found' })
}