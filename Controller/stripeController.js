const Stripe = require('stripe');
const stripe = Stripe("sk_test_51N79oyJ7fs1xKbHsNr9fTXZYQSanT8RwZ1DYvIcYStztfUYmVRn1U0eYUP36XsXFSa1VNybEazW4urgH6Xp7Lw6t006KbyoGBK"); // Use environment variable for secret key

// Create a payment session
const createPaymentSession = async (req, res) => {
  try {
    const { totalPrice } = req.body; // Amount should be passed from frontend, in cents (e.g., 5000 for $50)

    // Create Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'GearGrid',
            },
            
            unit_amount: totalPrice * 100, // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/complete-order`, // Redirect after success
      cancel_url: `${process.env.FRONTEND_URL}/cancel`, // Redirect after cancellation
    });
    console.log("session "+JSON.stringify(session));
    

    res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { createPaymentSession }; 