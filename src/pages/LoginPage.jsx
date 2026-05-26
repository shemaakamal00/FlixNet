import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleLogin() {
    login();
    navigate("/watchlist");
  }

  return (
    <main style={{ padding: "3rem", color: "white" }}>
      <h1>Login</h1>
      <p>Den här sidan finns för att visa protected routes i projektet.</p>
      <button onClick={handleLogin}>Logga in</button>
    </main>
  );
}

export default LoginPage;