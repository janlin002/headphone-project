import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY)
