import Stripe from 'stripe'
import { Bag } from 'store/bag'

const apiVersion = '2020-08-27'

export interface CheckoutParams {
  items: Bag[]
  callbackDomain: string
}

export async function createCheckoutSession({ callbackDomain, items }: CheckoutParams) {
  try {
    const lineItems: Array<Stripe.Checkout.SessionCreateParams.LineItem> = items.map(item => ({
      currency: 'SGD',
      name: item.name,
      amount: item.price * 100,
      quantity: item.quantity
    }))

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion })

    const sessions = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      payment_method_types: ['card', 'grabpay'],
      shipping_address_collection: {
        allowed_countries: ['SG', 'MY', 'ID']
      },
      billing_address_collection: 'required',
      success_url: `${callbackDomain}/payment-success`,
      cancel_url: `${callbackDomain}/bag`
    })

    return {
      sessionId: sessions.id
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`🚨 services ~ checkout ~ createCheckoutSession:`, error)

    throw new Error(error)
  }
}
