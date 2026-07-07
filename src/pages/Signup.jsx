import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      const res = await api.post("/auth/signup", {
        organizationName,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      alert("Signup Failed");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 50 }}>
      <h1>Create Account</h1>

      <input
        placeholder="Organization"
        onChange={(e) => setOrganizationName(e.target.value)}
      />

      <br />
      <br />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={signup}>Signup</button>

      <br />
      <br />

      <Link to="/">Already have an account?</Link>
    </div>
  );
}

export default Signup;