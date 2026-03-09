import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const Layout = () => (
  <main className="flex min-h-screen bg-[#F0EBE5]">
    <Sidebar />
    <section className="ml-[25%] w-3/4 p-8 overflow-y-auto min-h-screen">
      <Outlet />
    </section>
  </main>
)

export default Layout