import { NextApiRequest, NextApiResponse } from 'next'
import { getSneakers } from 'services/sneaker'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  try {
    const results = await getSneakers(req.query)

    return res.status(200).json(results)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
