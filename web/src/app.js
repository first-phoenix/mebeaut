import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/landing'
import TryOn from './pages/tryon'
import Cart from './pages/cart'
import CartPage from './pages/cartpage'

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/tryon",
    element: <TryOn />
  },
  {
    path: "/cart",
    element: <CartPage />
  }
])

export default AppRouter