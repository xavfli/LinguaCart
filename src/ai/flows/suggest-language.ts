// src/ai/flows/suggest-language.ts
'use server';

/**
 * @fileOverview This file contains a Genkit flow that suggests a user's preferred language based on their IP address.
 *
 * - suggestLanguage - A function that suggests a preferred language based on IP address.
 * - SuggestLanguageInput - The input type for the suggestLanguage function.
 * - SuggestLanguageOutput - The return type for the suggestLanguage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getCountryCode} from '@/services/ip-location';

const SuggestLanguageInputSchema = z.object({
  ipAddress: z
    .string()
    .describe('The IP address of the user.'),
});
export type SuggestLanguageInput = z.infer<typeof SuggestLanguageInputSchema>;

const SuggestLanguageOutputSchema = z.object({
  languageCode:
    z.string()
      .optional()
      .describe('The suggested language code based on the user IP address, can be: en, ru, uz. If no match, leave empty.'),
});
export type SuggestLanguageOutput = z.infer<typeof SuggestLanguageOutputSchema>;

export async function suggestLanguage(input: SuggestLanguageInput): Promise<SuggestLanguageOutput> {
  return suggestLanguageFlow(input);
}

const suggestLanguagePrompt = ai.definePrompt({
  name: 'suggestLanguagePrompt',
  input: {schema: SuggestLanguageInputSchema},
  output: {schema: SuggestLanguageOutputSchema},
  prompt: `You are a language suggestion tool. Given an IP address, you will suggest the most appropriate language code.

  Here are the supported language codes:
  - English: en
  - Russian: ru
  - Uzbek: uz

  Do not translate. Respond only with one of the language codes listed above. If the IP address is not from a country that speaks any of the supported languages, respond with empty string.

  IP Address: {{{ipAddress}}}
  Country Code: {{countryCode}}`,
});

const suggestLanguageFlow = ai.defineFlow(
  {
    name: 'suggestLanguageFlow',
    inputSchema: SuggestLanguageInputSchema,
    outputSchema: SuggestLanguageOutputSchema,
  },
  async input => {
    const countryCode = await getCountryCode(input.ipAddress);

    const {output} = await suggestLanguagePrompt({...input, countryCode});

    return output!;
  }
);
