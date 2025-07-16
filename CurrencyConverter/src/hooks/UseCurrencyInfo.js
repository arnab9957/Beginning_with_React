import { useEffect, useState, useCallback } from "react";
import { apiUtils } from "../utils/api.js";
import { errorHandler } from "../utils/errorHandler.js";
import { validation } from "../utils/validation.js";
import config from "../config/app.js";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const fetchCurrencyData = useCallback(async (currencyCode) => {
        if (!validation.isValidCurrency(currencyCode)) {
            setError(new Error('Invalid currency code'));
            setLoading(false);
            return;
        }

        const cacheKey = `currency_${currencyCode.toUpperCase()}`;
        
        // Check cache first
        const cachedData = apiUtils.getCache(cacheKey);
        if (cachedData) {
            setData(cachedData.rates || {});
            setLastUpdated(cachedData.timestamp);
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await apiUtils.fetchWithRetry(
                `${config.api.baseUrl}/${currencyCode.toUpperCase()}`
            );
            
            const result = await response.json();
            
            if (result && result.rates) {
                const processedData = {
                    rates: result.rates,
                    timestamp: new Date().toISOString(),
                    baseCurrency: result.base_code || currencyCode.toUpperCase(),
                };

                setData(result.rates);
                setLastUpdated(processedData.timestamp);
                
                // Cache the data
                apiUtils.setCache(cacheKey, processedData);
                
                if (import.meta.env.MODE === 'development') {
                    console.log("Currency data fetched:", result.rates);
                }
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (err) {
            const handledError = errorHandler.handleApiError(err);
            setError(handledError);
            errorHandler.logError(handledError, { currency: currencyCode });
            
            // Set empty data on error to prevent crashes
            setData({});
        } finally {
            setLoading(false);
        }
    }, []);

    // Refresh data function
    const refresh = useCallback(() => {
        if (currency) {
            fetchCurrencyData(currency);
        }
    }, [currency, fetchCurrencyData]);

    useEffect(() => {
        if (currency) {
            fetchCurrencyData(currency);
        }
    }, [currency, fetchCurrencyData]);

    return { 
        data, 
        loading, 
        error, 
        lastUpdated, 
        refresh,
        isStale: lastUpdated && (Date.now() - new Date(lastUpdated).getTime()) > config.cache.duration
    }; 
}

export default useCurrencyInfo;
