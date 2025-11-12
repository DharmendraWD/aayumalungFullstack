

import VerifyOTOPClient from "./VerifyOTPClient"

// 1. The component must be async (which you already did)
export default async function Page(props) {
         const { params } = props;
  const awaitedParams = await params;
  const email = awaitedParams.email;

const decodedEmail = decodeURIComponent(email);


return (

<>
<VerifyOTOPClient 
          email={decodedEmail} 
      />
</>
 );
}