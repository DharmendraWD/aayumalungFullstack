// app/admin/change-password/[email]/page.jsx
import { cookies } from 'next/headers';
import ChangePasswordClient from './ChangePasswordClient';

// 1. The component must be async (which you already did)
export default async function Page(props) {
         const { params } = props;
  const awaitedParams = await params;
  const email = awaitedParams.email;

const decodedEmail = decodeURIComponent(email);

// 2.  CRITICAL FIX: You must AWAIT the cookies() function 
 const cookieStore = await cookies(); 

// 3. Now, 'cookieStore' is the actual store object with the .get() method
const accessToken = cookieStore.get('accessToken')?.value; 

return (
// Pass the email value down to your client component:
<>
<ChangePasswordClient 
          email={decodedEmail} 
      />

</>
 );
}