import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './app'
import ProviderWrapper from './context/store'
import './root.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <ProviderWrapper>
        <RouterProvider router = { AppRouter } />
    </ProviderWrapper>
)