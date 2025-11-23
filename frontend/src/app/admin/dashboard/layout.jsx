import Sidebar from '@/app/admin/(components)/Sidebar/Sidebar'
import "../adminCss.css"
import SidebarParent from '../(components)/Sidebar/SidebarParent'

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#364153' }}>
      {/* <Sidebar /> */}
      <SidebarParent />
      <main key='slmw' style={{ flex: 1, padding: '1rem' }} className='adminBg relative m-[20px]'>
        {children}
      </main>
    </div>
  )
}
