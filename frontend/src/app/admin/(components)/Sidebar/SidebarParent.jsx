
import { cookies } from 'next/headers';
import SidebarMenu from './Sidebar';



export default async function Page() {


 const cookieStore = await cookies(); 


const accessToken = cookieStore.get('accessToken')?.value; 
const email = cookieStore.get('email')?.value; 
const username = cookieStore.get('username')?.value; 


return (
<>
<SidebarMenu 
          accessToken={accessToken} 
          email={email} 
          username={username} 
      />

</>
 );
}