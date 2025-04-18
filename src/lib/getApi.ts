// Import at the top level instead of inside try-catch
import getConfig from 'next/config';

export function getApiUrl() {
  // For client-side rendering, check hostname first
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'evergreendata-web.fajitasmaster.fr') {
      return 'https://evergreendata-api.fajitasmaster.fr/';
    }
  }
  
  // Try next/config with proper error handling
  try {
    const { publicRuntimeConfig } = getConfig() || {};
    if (publicRuntimeConfig?.apiUrl) {
      return publicRuntimeConfig.apiUrl;
    }
  } catch (e) {
    console.debug('Could not load config:', e);
  }
  
  // Fall back to environment variable or hardcoded default
  return process.env.NEXT_PUBLIC_API_URL || 'https://evergreendata-api.fajitasmaster.fr/';
}