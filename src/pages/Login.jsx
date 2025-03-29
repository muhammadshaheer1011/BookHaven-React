import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Demo Users
  const demoUsers = [
    { username: "shaheer", password: "8719" },
    { username: "ali", password: "1234" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Login Hints */}
      <div className="login-hints">
        <p><strong>Demo Logins:</strong></p>
        <p>👤 <strong>Username:</strong> shaheer | 🔑 <strong>Password:</strong> 8719</p>
        <p>👤 <strong>Username:</strong> ali | 🔑 <strong>Password:</strong> 1234</p>
      </div>

      {/* Auto-Fill Buttons */}
      <button onClick={() => { 
        setUsername(demoUsers[0].username); 
        setPassword(demoUsers[0].password);
      }}>
        Fill as shaheer
      </button>

      <button onClick={() => { 
        setUsername(demoUsers[1].username); 
        setPassword(demoUsers[1].password);
      }}>
        Fill as ali
      </button>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Enter Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
