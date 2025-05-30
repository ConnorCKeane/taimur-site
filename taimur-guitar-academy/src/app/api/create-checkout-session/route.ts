import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(request: Request) {
  try {
    const { lessonTitle, price, date, name, phone, email, message } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: lessonTitle,
              description: `Guitar lesson on ${new Date(date).toLocaleDateString()}`,
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lessons/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/lessons`,
      metadata: {
        name: name || '',
        phone: phone || '',
        email: email || '',
        message: message || '',
        lessonTitle: lessonTitle || '',
        date: date || '',
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    const err = error as Error;
    console.error('Stripe error:', err.message, err.stack, error);
    return NextResponse.json(
      { error: err.message || 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 