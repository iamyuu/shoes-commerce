import { NextApiRequest, NextApiResponse } from 'next'
import { getSneakers } from 'services/sneaker'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  // cache for 1 week, but it can be used for an extra 1 day if the server responds with an error
  res.setHeader('Cache-Control', 'public, max-age=604800, stale-if-error=86400')

  try {
    const results = await getSneakers(req.query)

    return res.status(200).json(results)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
