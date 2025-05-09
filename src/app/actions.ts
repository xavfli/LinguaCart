'use server';

import { headers } from 'next/headers';
import { suggestLanguage as suggestLanguageFlow } from '@/ai/flows/suggest-language';
import type { SuggestLanguageOutput, Language } from '@/types';

export async function getSuggestedLanguage(): Promise<SuggestLanguageOutput> {
  const headersList = headers();
  // Use 'x-forwarded-for' for environments behind a proxy, or 'remoteAddress' for direct connections.
  // Vercel provides 'x-vercel-forwarded-for'. For local dev, this might be tricky without a reverse proxy.
  // A common pattern is to check multiple headers or rely on specific platform headers.
  // For simplicity, we'll try 'x-forwarded-for'.
  const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 
                    headersList.get('x-real-ip')?.trim() ||
                    // Fallback for local development or direct connection (less reliable for true client IP)
                    // Note: `remoteAddress` is not directly available in Server Actions like this.
                    // A common local dev IP or a known test IP could be used here if needed for testing.
                    // For production, ensure your hosting provider sets a reliable IP header.
                    '8.8.8.8'; // Fallback to a generic IP if none found

  try {
    const result = await suggestLanguageFlow({ ipAddress });
    // Ensure the output is one of the supported languages
    const validLanguages: Language[] = ['en', 'ru', 'uz'];
    if (result.languageCode && validLanguages.includes(result.languageCode as Language)) {
      return { languageCode: result.languageCode as Language };
    }
    return { languageCode: undefined };
  } catch (error) {
    console.error('Error suggesting language:', error);
    return { languageCode: undefined }; // Return undefined on error
  }
}
