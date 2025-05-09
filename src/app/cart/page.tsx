'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { useLanguage } from '@/contexts/language-context';
import CartItemCard from '@/components/cart/cart-item-card';
import CartSummary from '@/components/cart/cart-summary';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems } = useCart();
  const { translate } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{translate('shoppingCart')}</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground mb-4">{translate('emptyCart')}</p>
          <Button asChild>
            <Link href="/">{translate('continueShopping')}</Link>
          </Button>
        </div>
      ) : (
        <div className="lg:flex lg:gap-8">
          <div className="lg:w-2/3">
            <div className="space-y-4 rounded-lg border bg-card text-card-foreground shadow-sm">
              {cartItems.map(item => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}
