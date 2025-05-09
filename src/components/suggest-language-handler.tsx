'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import type { Language } from '@/types';
import { getSuggestedLanguage } from '@/app/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export default function SuggestLanguageHandler() {
  const { language, setLanguage, translate } = useLanguage();
  const [suggestedLang, setSuggestedLang] = useState<Language | undefined>(undefined);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const hasSeenSuggestion = sessionStorage.getItem('linguaCart-suggestionSeen');
    if (hasSeenSuggestion) {
      return;
    }

    async function fetchSuggestion() {
      try {
        const result = await getSuggestedLanguage();
        if (result.languageCode && result.languageCode !== language) {
          setSuggestedLang(result.languageCode as Language);
          setShowDialog(true);
        }
      } catch (error) {
        console.error('Failed to fetch language suggestion:', error);
      }
    }

    // Delay suggestion to allow main content to load and improve UX
    const timer = setTimeout(fetchSuggestion, 2000); 
    return () => clearTimeout(timer);
  }, [language]);

  const handleSwitchLanguage = () => {
    if (suggestedLang) {
      setLanguage(suggestedLang);
    }
    setShowDialog(false);
    sessionStorage.setItem('linguaCart-suggestionSeen', 'true');
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    sessionStorage.setItem('linguaCart-suggestionSeen', 'true');
  };

  if (!showDialog || !suggestedLang) {
    return null;
  }

  const languageNames: Record<Language, string> = {
    en: translate('english'),
    ru: translate('russian'),
    uz: translate('uzbek'),
  };
  const suggestedLanguageName = languageNames[suggestedLang] || suggestedLang.toUpperCase();

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translate('language')}</AlertDialogTitle>
          <AlertDialogDescription>
            {translate('suggestedLanguageMessage', { languageName: suggestedLanguageName })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialog}>{translate('cancel')}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleSwitchLanguage}>
              {translate('switchTo', { languageName: suggestedLanguageName })}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
