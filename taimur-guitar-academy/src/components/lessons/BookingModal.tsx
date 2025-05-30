import { Dialog } from '@headlessui/react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLesson: {
    title: string;
    price: number;
    duration: string;
  };
  selectedDate: Date;
  selectedTime: string;
  selectedDuration: number;
  darkMode?: boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function BookingModal({
  isOpen,
  onClose,
  selectedLesson,
  selectedDate,
  selectedTime,
  selectedDuration,
  darkMode,
}: BookingModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const stripe = await stripePromise;
      
      // Create a payment session on your server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lessonTitle: selectedLesson.title,
          price: selectedLesson.price,
          date: selectedDate.toISOString(),
          time: selectedTime,
          duration: selectedDuration,
        }),
      });

      const session = await response.json();

      if (!session.id) {
        alert(session.error || 'Could not create checkout session. Please try again.');
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={darkMode ? 'mx-auto max-w-sm rounded-2xl bg-[#232326] p-6 shadow-xl border border-white/10 text-white' : 'mx-auto max-w-sm rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-white/20'}>
          <Dialog.Title className="text-lg font-medium leading-6">
            Confirm Your Booking
          </Dialog.Title>
          
          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-medium text-white">{selectedLesson.title}</h3>
              <p className="text-sm text-gray-200">{selectedLesson.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-200">
                Date: {selectedDate.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-200">
                Time: {selectedTime}
              </p>
              <p className="text-sm text-gray-200">
                Duration: {selectedDuration} minutes
              </p>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between">
                <span className="text-white">Total</span>
                <span className="font-medium text-white">${selectedLesson.price}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className={darkMode ? 'inline-flex justify-center rounded-xl border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 transition-colors' : 'inline-flex justify-center rounded-xl border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors'}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className={darkMode ? 'inline-flex justify-center rounded-xl border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#232326] hover:bg-gray-200 transition-colors disabled:opacity-50' : 'inline-flex justify-center rounded-xl border border-transparent bg-[#1a202c] px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50'}
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 