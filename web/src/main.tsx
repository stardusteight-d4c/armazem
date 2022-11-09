import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
