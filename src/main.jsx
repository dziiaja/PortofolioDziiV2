import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { BrowserRouter as Router } from 'react-router-dom'

AOS.init({
  duration: 800,
  once: false,
  offset: 120,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router 
      future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </Router>
  </React.StrictMode>
)