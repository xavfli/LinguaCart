'use client';

import Image from 'next/image';
import type { Product as ProductType } from '@/types';
import { useLanguage } from '@/contexts/language-context';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: ProductType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, translate } = useLanguage();
  const { addItem } = useCart();
  const { toast } = useToast();

  const translatedProduct = product.translations[language] || product.translations.en;

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: `${translatedProduct.name} ${translate('addedToCart') || 'added to cart!'}`,
      description: translate('youCanViewCart') || 'You can view your cart or continue shopping.',
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          <Image
            src={product.image}
            alt={translatedProduct.name}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
            data-ai-hint={product.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1">{translatedProduct.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground min-h-[3em] line-clamp-2">
          {translatedProduct.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        <Button onClick={handleAddToCart} aria-label={`${translate('addToCart')} ${translatedProduct.name}`}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {translate('addToCart')}
        </Button>
      </CardFooter>
    </Card>
  );
}
