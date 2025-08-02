import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useJob } from "../context/JobProvider";

export default function GoogleLoginButton() {
  const {user, setUser} = useJob();
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          function parseJwt(token) {
            if (!token) return null;
            try {
              const base64Url = token.split('.')[1];
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
              return JSON.parse(jsonPayload);
            } catch (e) {
              console.error("JWT decode failed", e);
              return null;
            }
          }
          console.log("Login Success:", credentialResponse);

          const { clientId, credential, select_by } = credentialResponse;

          // 解码 JWT（可选）
          const decoded = parseJwt(credential);

          console.log("user Login Info:", decoded.given_name); 
          setUser(decoded.given_name);
          
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}