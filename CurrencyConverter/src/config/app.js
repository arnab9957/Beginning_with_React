// Application Configuration
export const config = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Currency Converter',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: import.meta.env.MODE || 'development',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://open.er-api.com/v6/latest',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  cache: {
    duration: parseInt(import.meta.env.VITE_CACHE_DURATION) || 300000, // 5 minutes
    maxSize: 100,
  },
  ui: {
    defaultCurrency: {
      from: 'USD',
      to: 'INR',
    },
    supportedCurrencies: [
      'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'KRW'
    ],
  },
};

export default config;
