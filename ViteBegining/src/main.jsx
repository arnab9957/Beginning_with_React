import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Text from './text.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
  <Text />
  </>
)
