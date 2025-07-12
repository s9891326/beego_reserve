import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const GoogleLoginButton = ({ onSuccess }: { onSuccess: () => void }) => {
  const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

  return (
    <>
      <GoogleOAuthProvider clientId="89467337257-si4g83buq7c91pss212053tu2ee8tq61.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const idToken = credentialResponse.credential;

            // 傳給你自己的後端做驗證
            const res = await fetch(`${API_DOMAIN}/auth/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id_token: idToken }),
            });

            const data = await res.json();
            localStorage.setItem("token", data.token); // 後端回傳自有的 token (JWT)
            onSuccess();
          }}
          onError={() => console.log("登入失敗")}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp && decoded.exp > now) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return { isAuthenticated, setIsAuthenticated };
}

export default GoogleLoginButton;
