import { paginator } from "@/utils"
import titles from '@/db/titles.json'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function titlesHandler(
  req,
  res
) {
  const { q, page, per_page } = req.query
  const items = q ? titles.filter(title => title.title.toLowerCase().includes(q.toLowerCase())) : titles
  const result = paginator(items, page, per_page)
  res.status(200).send(result)
}