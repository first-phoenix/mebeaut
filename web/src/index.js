import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import ProviderWrapper from './context/store'
import AppRouter from './app'
import './root.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ProviderWrapper>
        <RouterProvider router = { AppRouter } />
    </ProviderWrapper>
)