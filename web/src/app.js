import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Skeleton from './layouts/skeleton'
import Home from './pages/landing'
import TryOn from './pages/tryon'
import Cart from './pages/cart'

// Inner pages should not open on warmup
const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = { <Skeleton /> }>
      <Route index element = { <Home /> } />
      <Route path = "/tryon" element = { <TryOn /> } />
      <Route path = "/cart" element = { <Cart /> } />
    </Route>
  )
)

export default AppRouter