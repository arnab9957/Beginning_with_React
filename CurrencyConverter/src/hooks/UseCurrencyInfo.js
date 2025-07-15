import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({}) // Using empty obj to avoid errors when calling the API
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        setLoading(true)
        // Using ExchangeRate-API which is working
        fetch(`https://open.er-api.com/v6/latest/${currency.toUpperCase()}`)
        .then((res) => res.json())
        .then((res) => {
            // Extract the rates from the response
            if (res && res.rates) {
                setData(res.rates);
                console.log("Currency data fetched:", res.rates);
            } else {
                console.error("Invalid API response format:", res);
            }
        })
        .catch((error) => {
            console.error("Error fetching currency data:", error);
        })
        .finally(() => {
            setLoading(false);
        });
        
    }, [currency])

    return { data, loading }; 
}

export default useCurrencyInfo;
