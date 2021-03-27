import { NextApiRequest, NextApiResponse } from 'next'
import { createCheckoutSession } from 'services/stripe'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  try {
    const session = await createCheckoutSession(req.body.items)

    return res.status(200).json({ id: session.id })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
