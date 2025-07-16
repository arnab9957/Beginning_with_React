// Error handling utilities
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
}

export const errorHandler = {
  // Handle API errors
  handleApiError(error) {
    if (error.name === 'AbortError') {
      return new AppError('Request timeout. Please try again.', 'TIMEOUT_ERROR', 408);
    }
    
    if (error.message.includes('Failed to fetch')) {
      return new AppError('Network error. Please check your connection.', 'NETWORK_ERROR', 0);
    }
    
    if (error.message.includes('HTTP error')) {
      const statusMatch = error.message.match(/status: (\d+)/);
      const status = statusMatch ? parseInt(statusMatch[1]) : 500;
      
      switch (status) {
        case 404:
          return new AppError('Currency data not found.', 'NOT_FOUND', 404);
        case 429:
          return new AppError('Too many requests. Please wait a moment.', 'RATE_LIMIT', 429);
        case 500:
          return new AppError('Server error. Please try again later.', 'SERVER_ERROR', 500);
        default:
          return new AppError('An unexpected error occurred.', 'HTTP_ERROR', status);
      }
    }
    
    return new AppError(error.message || 'An unexpected error occurred.', 'UNKNOWN_ERROR');
  },

  // Log errors (in production, this would send to a logging service)
  logError(error, context = {}) {
    const errorLog = {
      message: error.message,
      code: error.code || 'UNKNOWN',
      statusCode: error.statusCode || 500,
      timestamp: error.timestamp || new Date().toISOString(),
      context,
      stack: error.stack,
    };

    if (import.meta.env.MODE === 'development') {
      console.error('Error logged:', errorLog);
    }
    
    // In production, send to logging service
    // Example: sendToLoggingService(errorLog);
  },

  // Get user-friendly error message
  getUserMessage(error) {
    const userMessages = {
      TIMEOUT_ERROR: 'The request is taking too long. Please try again.',
      NETWORK_ERROR: 'Please check your internet connection and try again.',
      NOT_FOUND: 'The requested currency information is not available.',
      RATE_LIMIT: 'Too many requests. Please wait a moment before trying again.',
      SERVER_ERROR: 'Our servers are experiencing issues. Please try again later.',
      VALIDATION_ERROR: 'Please check your input and try again.',
    };

    return userMessages[error.code] || 'Something went wrong. Please try again.';
  },
};

export default errorHandler;
