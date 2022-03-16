import { NextApiRequest, NextApiResponse } from 'next'
import { createCheckoutSession, CheckoutParams } from 'services/checkout'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'A request method is not supported' })
  }

  try {
    const data: CheckoutParams = {
      items: req.body.items,
      callbackDomain: req.headers.origin ?? ''
    }

    const result = await createCheckoutSession(data)

    return res.status(200).json(result)
  } catch (error) {
    return res.status(400).json({ message: (error as Error).message })
  }
}
