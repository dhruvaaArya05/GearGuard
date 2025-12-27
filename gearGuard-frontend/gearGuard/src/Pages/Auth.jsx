import { useState } from "react";

const API = "http://localhost:4000/api/users";

export default function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    setMsg("");

    if (isSignup && password !== confirm)
      return setMsg("Passwords do not match");

    const url = isSignup ? `${API}/signup` : `${API}/login`;

    const body = isSignup
      ? { name, email, password, role }
      : { email, password };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (!res.ok) return setMsg(data.message || "Error");

    localStorage.setItem("user", JSON.stringify(data));
    onLogin(data);
  };

  return (
    <div className="auth-card">
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      {isSignup && (
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
      )}

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: 8 }}
      />

      {isSignup && (
        <>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          />

          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ width: "100%", marginBottom: 8 }}
          >
            <option value="user">User</option>
            <option value="technician">Technician</option>
            <option value="manager">Manager</option>
          </select>
        </>
      )}

      <button onClick={submit} style={{ width: "100%" }}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p style={{ marginTop: 10 }}>
        {isSignup ? "Already have an account?" : "New user?"}{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Login" : "Signup"}
        </span>
      </p>

      {msg && <p style={{ color: "red" }}>{msg}</p>}
    </div>
  );
}
