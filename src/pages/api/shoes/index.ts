import { NextApiRequest, NextApiResponse } from 'next'
import allShoes from 'data/shoes.json'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  return res.status(200).json(allShoes)
}
