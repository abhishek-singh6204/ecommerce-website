import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/index.js'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import {Provider} from 'react-redux'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
  <Provider store={store}>
     <App />
    <Toaster/>
  </Provider>
   
</BrowserRouter>

)
