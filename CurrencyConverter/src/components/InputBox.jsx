import React, {useId} from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "USD",
    amountDisable = false,
    currencyDisable = false,
    className = "",
    theme = "light",
}) {
   const amountInputId = useId()

    return (
        <div className={`relative p-5 rounded-xl text-sm flex shadow-lg transition-all duration-300 ${className}`}>
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
            
            {/* Content */}
            <div className="relative z-10 w-1/2">
                <label 
                    htmlFor={amountInputId} 
                    className={`mb-3 inline-block font-semibold text-sm ${
                        theme === 'dark' 
                            ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                            : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}
                >
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className={`outline-none w-full bg-transparent py-2 font-bold text-xl transition-colors duration-300 ${
                        theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                    } focus:scale-105 transform transition-transform`}
                    type="number"
                    placeholder="0.00"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="relative z-10 w-1/2 flex flex-wrap justify-end text-right">
                <p className={`mb-3 w-full font-semibold text-sm ${
                    theme === 'dark' 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' 
                        : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
                }`}>
                    Currency Type
                </p>
                <select
                    className={`rounded-lg px-3 py-2 cursor-pointer outline-none font-semibold transition-all duration-300 transform hover:scale-105 ${
                        theme === 'dark' 
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    }`}
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency} className="bg-gray-800 text-white">
                        {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
