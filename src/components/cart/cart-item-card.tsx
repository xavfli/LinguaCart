'use client';

import Image from 'next/image';
import type { CartItem } from '@/types';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { language, translate } = useLanguage();
  const { updateQuantity, removeItem } = useCart();
  const { toast } = useToast();

  const translatedItem = item.translations[language] || item.translations.en;

  const handleQuantityChange = (newQuantity: number) => {
    const quantity = Math.max(0, newQuantity); // Ensure quantity is not negative
    updateQuantity(item.id, quantity);
    if (quantity === 0) {
       toast({
        title: `${translatedItem.name} ${translate('removedFromCart') || 'removed from cart.'}`,
      });
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
    toast({
      title: `${translatedItem.name} ${translate('removedFromCart') || 'removed from cart.'}`,
      variant: 'destructive',
    });
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <Image
        src={item.image}
        alt={translatedItem.name}
        width={80}
        height={80}
        className="rounded-md object-cover"
        data-ai-hint={item.imageHint}
      />
      <div className="flex-grow">
        <h3 className="font-semibold">{translatedItem.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)} aria-label={translate('decreaseQuantity')}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
          className="w-16 h-9 text-center"
          aria-label={translate('itemQuantity')}
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)} aria-label={translate('increaseQuantity')}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={handleRemoveItem} className="text-destructive hover:text-destructive" aria-label={translate('removeFromCart')}>
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
}
