import { NextApiRequest, NextApiResponse } from 'next'
import { getSneakerById } from 'services/sneaker'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  try {
    const result = await getSneakerById(req.query.id as string)

    return res.status(200).json(result)
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message })
  }
}
