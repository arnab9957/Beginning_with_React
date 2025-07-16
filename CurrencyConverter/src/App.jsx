import { useState, useEffect, useContext, useCallback } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/UseCurrencyInfo'
import ThemeToggle from './components/ThemeToggle'
import { ThemeContext } from './context/ThemeContext'
import { validation } from './utils/validation'
import { errorHandler } from './utils/errorHandler'
import config from './config/app'

function App() {
  const { theme } = useContext(ThemeContext);
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState(config.ui.defaultCurrency.from)
  const [to, setTo] = useState(config.ui.defaultCurrency.to)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [lastConversion, setLastConversion] = useState(null)

  const { data: currencyInfo, loading, error, lastUpdated, refresh, isStale } = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  // Memoized conversion calculation
  const calculateConversion = useCallback((inputAmount, rate) => {
    if (!validation.isValidAmount(inputAmount) || !rate) return 0;
    return parseFloat((inputAmount * rate).toFixed(6));
  }, []);

  // Auto-convert when component loads or currency changes
  useEffect(() => {
    if (currencyInfo[to] && validation.isValidAmount(amount)) {
      const result = calculateConversion(amount, currencyInfo[to]);
      setConvertedAmount(result);
      setLastConversion({
        from,
        to,
        amount,
        result,
        rate: currencyInfo[to],
        timestamp: new Date().toISOString()
      });
    }
  }, [amount, from, to, currencyInfo, calculateConversion])

  const swap = useCallback(() => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }, [from, to, amount, convertedAmount])
  
  const convert = useCallback(() => {
    if (!validation.isValidAmount(amount)) {
      return;
    }
    
    const result = calculateConversion(amount, currencyInfo[to]);
    setConvertedAmount(result);
    setLastConversion({
      from,
      to,
      amount,
      result,
      rate: currencyInfo[to],
      timestamp: new Date().toISOString()
    });
  }, [amount, from, to, currencyInfo, calculateConversion])

  const handleAmountChange = useCallback((newAmount) => {
    const sanitized = validation.sanitizeAmount(newAmount);
    setAmount(sanitized);
  }, []);

  const handleRefresh = useCallback(() => {
    refresh();
  }, [refresh]);

  // Error display component
  const ErrorDisplay = ({ error, onRetry }) => (
    <div className={`p-4 rounded-lg mb-6 ${
      theme === 'dark' 
        ? 'bg-red-900/20 border border-red-500/30' 
        : 'bg-red-50 border border-red-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className={`w-5 h-5 mr-2 ${
            theme === 'dark' ? 'text-red-400' : 'text-red-500'
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className={`text-sm ${
            theme === 'dark' ? 'text-red-300' : 'text-red-700'
          }`}>
            {errorHandler.getUserMessage(error)}
          </span>
        </div>
        <button
          onClick={onRetry}
          className={`text-xs px-3 py-1 rounded transition-colors ${
            theme === 'dark'
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-red-100 hover:bg-red-200 text-red-700'
          }`}
        >
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen flex justify-center items-center p-4 transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <ThemeToggle />
      <div className="w-full max-w-md">
        <div className={`relative rounded-xl shadow-2xl p-6 backdrop-blur-sm transition-all duration-500 ${
          theme === 'dark' 
            ? 'bg-gray-800/80' 
            : 'bg-white/80'
        }`}>
          {/* Static gradient border */}
          <div className={`absolute inset-0 rounded-xl p-[2px] ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500'
              : 'bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500'
          }`}>
            <div className={`h-full w-full rounded-xl ${
              theme === 'dark' ? 'bg-gray-800/90' : 'bg-white/90'
            }`}></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className={`text-3xl font-bold transition-colors duration-300 ${
                theme === 'dark' 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
              }`}>
                Currency Converter
              </h2>
              
              {lastUpdated && (
                <div className="text-right">
                  <button
                    onClick={handleRefresh}
                    className={`text-xs px-2 py-1 rounded transition-colors ${
                      isStale
                        ? theme === 'dark' 
                          ? 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30'
                          : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : theme === 'dark'
                          ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                    title={`Last updated: ${new Date(lastUpdated).toLocaleTimeString()}`}
                  >
                    {isStale ? '⚠ Refresh' : '✓ Updated'}
                  </button>
                </div>
              )}
            </div>

            {error && <ErrorDisplay error={error} onRetry={handleRefresh} />}
            
            {loading ? (
              <div className="text-center py-10">
                <div className={`inline-block animate-spin rounded-full h-8 w-8 border-b-2 ${
                  theme === 'dark' ? 'border-purple-400' : 'border-blue-500'
                }`}></div>
                <p className={`mt-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  Loading currency data...
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  convert();
                }}
                className="space-y-6"
              >
                <div className="w-full">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    selectCurrency={from}
                    onAmountChange={handleAmountChange}
                    theme={theme}
                  />
                </div>
                
                <div className={`relative w-full h-0.5 my-6 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                    : 'bg-gradient-to-r from-blue-400 to-purple-400'
                }`}>
                  <button
                    type="button"
                    className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-110 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-lg shadow-blue-500/25'
                    }`}
                    onClick={swap}
                    disabled={loading}
                  >
                    ⇅ Swap
                  </button>
                </div>
                
                <div className="w-full">
                  <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectCurrency={to}
                    amountDisable
                    theme={theme}
                  />
                </div>

                {lastConversion && (
                  <div className={`text-center text-sm p-3 rounded-lg ${
                    theme === 'dark' 
                      ? 'bg-gray-700/50 text-gray-300' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <p>
                      1 {lastConversion.from} = {lastConversion.rate.toFixed(6)} {lastConversion.to}
                    </p>
                    <p className="text-xs mt-1 opacity-75">
                      {validation.formatCurrency(lastConversion.amount, lastConversion.from)} = {validation.formatCurrency(lastConversion.result, lastConversion.to)}
                    </p>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={loading || !validation.isValidAmount(amount)}
                  className={`w-full px-4 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-xl shadow-purple-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white shadow-xl shadow-blue-500/25'
                  }`}
                >
                  {loading ? 'Loading...' : `Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
