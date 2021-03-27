import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'
import { apiRoutes } from 'utils/api-client'
import { Bag } from 'store/bag'

export async function createCheckoutSession(items: Bag[]) {
  const lineItems = items.map(item => ({
    currency: 'USD',
    name: item.name,
    amount: item.price,
    quantity: item.quantity
  }))

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })
  const callbackDomain = process.env.STRIPE_CALLBACK_DOMAIN

  return stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    payment_method_types: ['card'],
    success_url: `${callbackDomain}?payment=success`,
    cancel_url: `${callbackDomain}/bag?payment=canceled`
  })
}

export async function redirectToCheckout(items: Bag[]) {
  const { id } = await apiRoutes('/create-checkout-session', { data: { items } })
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const result = await stripe.redirectToCheckout({ sessionId: id })

  if (result.error) {
    throw result.error
  }
}
