import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'

const Layout = () => {
  const location = useLocation();
  const hideSearchbar = ['/dashboard/messages']
  return (
  <main className="flex min-h-screen bg-[#F0EBE5] overflow-y-hidden ">
    <Sidebar />
    <section className="ml-[25%] w-3/4 p-8 min-h-screen">
    {!hideSearchbar.includes(location.pathname) && <SearchBar />}
      <Outlet />
    </section>
  </main>
)}

export default Layout