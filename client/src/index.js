import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { AlertContext } from './providers/context/Alert'
import { UserContext } from './providers/context/User'

import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertContext>
        <UserContext>
          <App />
        </UserContext>
      </AlertContext>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
