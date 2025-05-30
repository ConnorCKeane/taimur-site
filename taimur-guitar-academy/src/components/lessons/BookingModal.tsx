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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const handlePayment = async () => {
    setError('');
    // Validate fields
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }
    try {
      setIsProcessing(true);
      // 1. Send email notification
      const emailRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!emailRes.ok) {
        setError('Failed to send your details. Please try again.');
        setIsProcessing(false);
        return;
      }
      // 2. Proceed to Stripe
      const stripe = await stripePromise;
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
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          setError('Stripe error: ' + error.message);
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (showThankYou) {
    return (
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className={darkMode ? 'mx-auto max-w-sm rounded-2xl bg-[#232326] p-6 shadow-xl border border-white/10 text-white' : 'mx-auto max-w-sm rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-white/20'}>
            <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
            <p className="text-gray-300 text-center mb-2">Your message has been sent.<br />We appreciate your interest and will get back to you soon.</p>
            <button
              onClick={() => { setShowThankYou(false); onClose(); }}
              className="mt-4 px-4 py-2 text-sm font-semibold text-white bg-transparent border border-white rounded-md hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={darkMode ? 'mx-auto w-full max-w-2xl rounded-2xl bg-[#232326] p-8 shadow-xl border border-white/10 text-white' : 'mx-auto w-full max-w-2xl rounded-2xl bg-white/90 backdrop-blur-sm p-8 shadow-xl border border-white/20'}>
          <Dialog.Title className="text-lg font-medium leading-6 mb-2 md:mb-0">
            Confirm Your Booking
          </Dialog.Title>
          <div className="mt-4 flex flex-col md:flex-row gap-8 pb-4">
            {/* Left: Booking summary */}
            <div className="flex-1 space-y-4 md:space-y-2 md:pr-6 border-b md:border-b-0 md:border-r border-gray-300/20 pb-4 md:pb-0 md:mb-0 mb-6">
              <h3 className="font-medium text-white">{selectedLesson.title}</h3>
              <p className="text-sm text-gray-200">Expert-led guitar sessions tailored for every level.</p>
              <div className="mt-8 space-y-2">
                <p className="text-sm text-gray-200">Date: {selectedDate.toLocaleDateString()}</p>
                <p className="text-sm text-gray-200">Time: {selectedTime}</p>
                <p className="text-sm text-gray-200">Duration: {selectedDuration} minutes</p>
                <div className="border-t border-gray-700 pt-4 mt-2">
                  <div className="flex justify-between">
                    <span className="text-white">Total</span>
                    <span className="font-medium text-white">${selectedLesson.price}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Right: Input fields */}
            <form className="flex-1 space-y-3" onSubmit={e => { e.preventDefault(); handlePayment(); }}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white bg-white/5 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white bg-white/5 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white bg-white/5 placeholder-gray-400"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={3}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-white bg-white/5 placeholder-gray-400"
                />
              </div>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-xl bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white/5 hover:text-[#232326] transition-colors"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-xl border border-white bg-transparent px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#232326] transition-colors disabled:opacity-50"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
} 