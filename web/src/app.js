import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/landing'
import TryOn from './pages/tryon'
import Cart from './pages/cart'

// Inner pages should not open on warmup
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
    element: <Cart />
  }
])

export default AppRouter