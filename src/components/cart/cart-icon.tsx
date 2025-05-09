'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function CartIcon() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  return (
    <Button variant="ghost" size="icon" asChild>
      <Link href="/cart" aria-label="Shopping Cart">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center rounded-full p-0 text-xs">
            {itemCount}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
