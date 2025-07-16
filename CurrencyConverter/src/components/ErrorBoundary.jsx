import React from 'react';
import { errorHandler } from '../utils/errorHandler.js';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    return { 
      hasError: true,
      error,
      errorId: Date.now().toString(36) + Math.random().toString(36).substr(2)
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Log error
    errorHandler.logError(error, {
      componentStack: errorInfo.componentStack,
      errorBoundary: true,
      props: this.props,
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null 
    });
  };

  render() {
    if (this.state.hasError) {
      const { theme = 'light' } = this.props;
      
      return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
          <div className={`max-w-md w-full rounded-xl shadow-2xl p-8 text-center ${
            theme === 'dark' 
              ? 'bg-gray-800/90 text-white' 
              : 'bg-white/90 text-gray-800'
          }`}>
            <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
              theme === 'dark' 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-red-100 text-red-500'
            }`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
              Oops! Something went wrong
            </h2>
            
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              We encountered an unexpected error. Don't worry, we've been notified and are working on it.
            </p>

            {import.meta.env.MODE === 'development' && this.state.error && (
              <details className={`mb-6 text-left p-4 rounded-lg ${
                theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <summary className="cursor-pointer font-medium mb-2">
                  Error Details (Development)
                </summary>
                <pre className={`text-xs overflow-auto ${
                  theme === 'dark' ? 'text-red-300' : 'text-red-600'
                }`}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white'
                }`}
              >
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Reload Page
              </button>
            </div>

            {this.state.errorId && (
              <p className={`mt-4 text-xs ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Error ID: {this.state.errorId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
