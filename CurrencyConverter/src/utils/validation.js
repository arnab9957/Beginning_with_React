// Validation utility functions
export const validation = {
  // Validate currency code
  isValidCurrency(currency) {
    return typeof currency === 'string' && 
           currency.length === 3 && 
           /^[A-Z]{3}$/.test(currency);
  },

  // Validate amount
  isValidAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num >= 0 && num <= 1000000000; // Max 1 billion
  },

  // Sanitize amount input
  sanitizeAmount(amount) {
    if (typeof amount === 'string') {
      // Remove any non-numeric characters except decimal point
      amount = amount.replace(/[^0-9.]/g, '');
      
      // Ensure only one decimal point
      const parts = amount.split('.');
      if (parts.length > 2) {
        amount = parts[0] + '.' + parts.slice(1).join('');
      }
    }
    
    const num = parseFloat(amount);
    return isNaN(num) ? 0 : Math.max(0, Math.min(num, 1000000000));
  },

  // Format currency display
  formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
      }).format(amount);
    } catch (error) {
      // Fallback formatting
      return `${currency} ${parseFloat(amount).toFixed(2)}`;
    }
  },

  // Format number with commas
  formatNumber(num) {
    return new Intl.NumberFormat().format(num);
  },
};

export default validation;
