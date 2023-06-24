import { paginator } from "@/utils"
import composers from '@/db/composers.json'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function composersHandler(
  req,
  res
) {
  const { q, page, per_page } = req.query
  const items = q ? composers.filter(composer => composer.name.toLowerCase().includes(q.toLowerCase())) : composers
  const result = paginator(items, page, per_page)
  res.status(200).send(result)
}