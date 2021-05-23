import { NextApiRequest, NextApiResponse } from 'next'
import { slugify } from 'utils/misc'
import allShoes from 'data/shoes.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  const { slug } = req.query
  const shoes = allShoes.find(val => slugify(val.name) === slug)

  if (!shoes) {
    return res.status(404).json({ message: 'Shoes not found' })
  }

  return res.status(200).json(shoes)
}
