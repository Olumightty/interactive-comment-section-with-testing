import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import data from '../data.json'


// localStorage.setItem('user', JSON.stringify(data.currentUser))
// localStorage.setItem('comments', JSON.stringify(data.comments))
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
