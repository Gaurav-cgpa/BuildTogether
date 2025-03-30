import { useState } from "react";
import { authStore } from "../../stores/auth.store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login,loading}=authStore();
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const res=login({username,password});

      if(res.data.success)
      {
         alert(res.data.message);
         navigate("/home");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?
          <a href="/signup" className="ml-2 text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
