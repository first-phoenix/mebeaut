import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/landing'
import TryOn from './pages/tryon'

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/tryon",
    element: <TryOn />
  }
])

export default AppRouter