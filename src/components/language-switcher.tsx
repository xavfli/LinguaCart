'use client';

import { Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import type { Language } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languageOptions: { value: Language; labelKey: string }[] = [
  { value: 'en', labelKey: 'english' },
  { value: 'ru', labelKey: 'russian' },
  { value: 'uz', labelKey: 'uzbek' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage, translate } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Languages className="h-5 w-5" />
          <span className="sr-only">{translate('language')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languageOptions.map(option => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setLanguage(option.value)}
            className={language === option.value ? 'bg-accent' : ''}
          >
            {translate(option.labelKey)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
