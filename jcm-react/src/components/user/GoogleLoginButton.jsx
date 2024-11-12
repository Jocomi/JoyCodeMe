import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const GoogleLoginButton = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(jwt_decode(credentialResponse.credential));
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </>
      );
    };

export default GoogleLoginButton;
