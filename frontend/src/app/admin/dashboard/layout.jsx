import Sidebar from '@/app/admin/(components)/Sidebar/Sidebar'
import "../adminCss.css"

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#364153' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '1rem' }} className='adminBg relative m-[20px]'>
        {children}
      </main>
    </div>
  )
}
