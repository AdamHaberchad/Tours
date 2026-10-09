import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [token, setToken] = useState<string | null>(null);

  function handleLoginSuccess(receivedToken: string) {
    setToken(receivedToken);
    console.log("Login successful!");
  }

  function handleSignupSuccess() {
    console.log("Signup successful!");
  }

  return (
    <div>
      <h1>Welcome to Tours</h1>

      {token ? (
        <p>You are logged in successfully.</p>
      ) : (
        <>
          <button onClick={() => setMode("login")}>Login</button>
          <button onClick={() => setMode("signup")}>Sign Up</button>

          {mode === "login" && (
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          )}

          {mode === "signup" && (
            <SignupForm onSignupSuccess={handleSignupSuccess} />
          )}
        </>
      )}
    </div>
  );
}

export default AuthPage;