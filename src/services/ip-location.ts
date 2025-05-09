// src/services/ip-location.ts
'use server';

/**
 * @fileOverview IP Geolocation Service
 * This file provides a mock implementation for fetching a country code based on an IP address.
 * In a real application, this would typically involve calling an external IP geolocation API.
 *
 * - getCountryCode - A function that returns a mock country code for a given IP address.
 */

/**
 * Fetches the country code for a given IP address.
 * This is a mock implementation.
 * @param ipAddress The IP address to look up.
 * @returns A promise that resolves to the two-letter country code (e.g., "US", "GB").
 */
export async function getCountryCode(ipAddress: string): Promise<string> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Mock responses based on IP
  // These IPs are just examples and may not correspond to actual locations.
  if (ipAddress.startsWith('8.8.8.') || ipAddress === '8.8.8.8') { // Google DNS, often used as fallback
    return 'US';
  }
  if (ipAddress.startsWith('91.108.4.') || ipAddress.startsWith('91.108.5.')) { // Example Russian IP block (Telegram)
    return 'RU';
  }
  if (ipAddress.startsWith('213.230.64.') || ipAddress.startsWith('213.230.96.')) { // Example Uzbek IP block (Uztelecom)
    return 'UZ';
  }
  if (ipAddress === '127.0.0.1' || ipAddress === '::1' || ipAddress.startsWith('192.168.') || ipAddress.startsWith('10.')) {
    // Local/private IPs, default to US for testing or if no other match
    return 'US';
  }

  // Default for other IPs if not specifically mapped
  // Using 'GB' as a generic default for unmapped public IPs for testing purposes
  return 'GB';
}
