'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

export default function CartSummary() {
  const { getCartTotal, cartItems } = useCart();
  const { translate } = useLanguage();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8 shadow-md">
      <CardHeader>
        <CardTitle>{translate('orderSummary')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>{translate('subtotal')}</span>
          <span>${total.toFixed(2)}</span>
        </div>
        {/* Add shipping, taxes, etc. if needed */}
        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
          <span>{translate('total')}</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" size="lg">
          <Link href="/checkout">{translate('proceedToCheckout')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
