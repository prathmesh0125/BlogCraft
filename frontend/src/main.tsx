// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContextProvider from './components/AI/Context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
    </ContextProvider>,
)
