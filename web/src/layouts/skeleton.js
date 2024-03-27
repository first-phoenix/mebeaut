import { Outlet } from 'react-router-dom'
import Navbar from '../utils/navbar'

export default function Skeleton() {
    return (
        <>
          <Navbar />
          <Outlet />
        </>
    )
}