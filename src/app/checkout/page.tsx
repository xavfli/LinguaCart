'use client';

import { useCart } from '@/contexts/cart-context';
import { useLanguage } from '@/contexts/language-context';
import PaymentForm from '@/components/checkout/payment-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const { translate, language } = useLanguage();
  const router = useRouter();
  const total = getCartTotal();

  useEffect(() => {
    if (cartItems.length === 0) {
      router.replace('/cart'); // Redirect to cart if it's empty
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return <div className="container mx-auto px-4 py-8 text-center">{translate('redirectingToCart') || 'Your cart is empty, redirecting...'}</div>; // Or a loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{translate('checkout')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{translate('orderSummary')}</CardTitle>
              <CardDescription>{translate('reviewYourOrder') || 'Please review your items before payment.'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => {
                  const translatedItem = item.translations[language] || item.translations.en;
                  return (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={item.image} 
                          alt={translatedItem.name} 
                          width={50} 
                          height={50} 
                          className="rounded object-cover"
                          data-ai-hint={item.imageHint}
                        />
                        <div>
                          <p className="font-medium">{translatedItem.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>{translate('total')}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>{translate('paymentDetails')}</CardTitle>
              <CardDescription>{translate('enterPaymentInfo') || 'Enter your payment information below.'}</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
