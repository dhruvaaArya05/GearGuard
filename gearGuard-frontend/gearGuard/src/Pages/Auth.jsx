import { useState } from "react";
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const API = "http://localhost:4000/api/users";

export default function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("user");
  const [msg, setMsg] = useState("");

  // const submit = async () => {
  //   setMsg("");

  //   if (isSignup && password !== confirm)
  //     return setMsg("Passwords do not match");

  //   const url = isSignup ? `${API}/signup` : `${API}/login`;

  //   const body = isSignup
  //     ? { name, email, password, role }
  //     : { email, password };

  //   const res = await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(body)
  //   });

  //   const data = await res.json();
  //   if (!res.ok) return setMsg(data.message || "Error");

  //   localStorage.setItem("user", JSON.stringify(data));
  //   onLogin(data);
  // };

  const submit = async () => {
    setMsg("");

    if (!email || !password || (isSignup && (!name || !confirm))) {
      return setMsg("All fields are required");
    }

    if (isSignup) {
      if (password !== confirm) {
        return setMsg("Passwords do not match");
      }

      if (!passwordRegex.test(password)) {
        return setMsg(
          "Password must be 8+ chars with uppercase, lowercase, number & special character"
        );
      }
    }

    const url = isSignup ? `${API}/signup` : `${API}/login`;

    const body = isSignup
      ? { name, email, password, role }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Authentication failed");

      localStorage.setItem("user", JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      setMsg(err.message);
    }
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


      {msg && (
        <div
          style={{
            background: "#ffe0e0",
            color: "#900",
            padding: "8px",
            borderRadius: "6px",
            marginTop: "10px",
            textAlign: "center"
          }}
        >
          {msg}
        </div>
      )}

    </div>
  );
}
