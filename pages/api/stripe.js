import Stripe from 'stripe'

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        // 運費方案
        shipping_options: [
          { shipping_rate: 'shr_1LCfg9CFYJvbmueJe13vwqZA' },
        ],
        // 基本資訊
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp')

          return {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price_data: {
              // 價格
              currency: 'usd',
              // 產品內容
              product_data: {
                name: item.name,
                images: [newImage],
              },
              // 單價
              unit_amount: item.price * 100,
            },
            // 可調數量(庫存)
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            // 數量
            quantity: item.qutity,
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      const session = await stripe.checkout.sessions.create(params)

      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

// Official WEB: https://stripe.com/en-gb
// Official Stripe DOC: https://stripe.com/docs
