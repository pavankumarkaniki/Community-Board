import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });

      // ✅ backend sends { user: {...} }
      login(res.data.user);

      console.log("Logged in user:", res.data.user);

      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submit}>
        <h1 className="community-head-form">Login</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="form-error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
