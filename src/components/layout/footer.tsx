'use client';

import { useLanguage } from '@/contexts/language-context';

export default function Footer() {
  const { translate } = useLanguage();
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          {translate('footer.copy')}
        </p>
      </div>
    </footer>
  );
}
