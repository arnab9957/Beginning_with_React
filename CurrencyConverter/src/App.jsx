import { useState, useEffect, useContext } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/UseCurrencyInfo'
import ThemeToggle from './components/ThemeToggle'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const { theme } = useContext(ThemeContext);
  const [amount, setAmount] = useState(1)
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const { data: currencyInfo, loading } = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  // Auto-convert when component loads or currency changes
  useEffect(() => {
    if (currencyInfo[to]) {
      setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
    }
  }, [amount, from, to, currencyInfo])

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2))
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-100">
      <ThemeToggle />
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-center mb-6">Currency Converter</h2>
          
          {loading ? (
            <div className="text-center py-10">
              <p>Loading currency data...</p>
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
                  onAmountChange={(amount) => setAmount(amount)}
                  theme={theme}
                />
              </div>
              
              <div className="relative w-full h-0.5 bg-gray-200 my-6">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-md px-3 py-1"
                  onClick={swap}
                >
                  Swap
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
              
              <button 
                type="submit" 
                className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default App
