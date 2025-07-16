import config from '../config/app.js';

// Simple cache implementation
const cache = new Map();

// API utility functions
export const apiUtils = {
  // Fetch with timeout and retry logic
  async fetchWithRetry(url, options = {}, retries = config.api.retryAttempts) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.api.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (retries > 0 && !controller.signal.aborted) {
        await new Promise(resolve => setTimeout(resolve, config.api.retryDelay));
        return this.fetchWithRetry(url, options, retries - 1);
      }
      
      throw error;
    }
  },

  // Cache management
  setCache(key, data) {
    // Implement LRU cache logic
    if (cache.size >= config.cache.maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  },

  getCache(key) {
    const cached = cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > config.cache.duration;
    if (isExpired) {
      cache.delete(key);
      return null;
    }

    return cached.data;
  },

  clearCache() {
    cache.clear();
  },
};

export default apiUtils;
