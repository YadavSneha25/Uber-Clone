import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!); // Ensure the API version is specified

export async function POST(request: Request) {

    const body = await request.json();
    const { name, email, amount } = body;

    if (!name || !email || !amount) {
      return new Response(
        JSON.stringify({
          error: "Please enter a valid name, email, and amount",
          status: 400,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }



    let customer;

    // Check for existing customer
    const existingCustomer = await stripe.customers.list({ email });
    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      // Create new customer
      customer = await stripe.customers.create({ name, email });
    }

    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2024-12-18.acacia'}
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount)*100,
        currency: 'usd',
        customer: customer.id,
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter
        // is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
          allow_redirects:"never",
        },
      });
    
      

    // Response for successful customer retrieval or creation
    return new Response(
      JSON.stringify({
        paymentIntent:paymentIntent,
        ephemeralKey:ephemeralKey,
        customer:customer.id,

       }),
      
    );
  }

