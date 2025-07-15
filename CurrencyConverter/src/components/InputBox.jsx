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
        <div className={`bg-white p-4 rounded-lg text-sm flex shadow-md ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-gray-600 mb-2 inline-block font-medium">
                    {label}
                </label>
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent text-black py-2 font-medium text-lg"
                    type="number"
                    placeholder="Amount"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                />
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-gray-600 mb-2 w-full font-medium">Currency Type</p>
                <select
                    className="rounded-lg px-2 py-1 bg-gray-100 text-black cursor-pointer outline-none font-medium"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency}>
                        {currency}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;
