'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import LanguageSwitcher from '@/components/language-switcher';
import CartIcon from '@/components/cart/cart-icon';
import { Flame } from 'lucide-react';

export default function Header() {
  const { translate } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Flame className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">
            {translate('appName')}
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
          {/* Add navigation links here if needed */}
        </nav>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <CartIcon />
        </div>
      </div>
    </header>
  );
}
