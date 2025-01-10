"use client";

import { useUserContext } from "@/context/userContext";
import { axiosClient } from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthResponse {
  data: {
    id: string;
    username: string;
  };
  message: string;
}

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const { setUsername: setLoggedInUsername, setId, id } = useUserContext();

  useEffect(() => {
    if (id) {
      router.push('/chat');
    }
  }, [id, router]);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!username.trim() || !password.trim()) {
      setError('Username and password are required');
      setIsLoading(false);
      return;
    }

    const url = isLoginOrRegister === 'register' ? 'register' : 'login';
    
    try {
      const response = await axiosClient.post<AuthResponse>(`/auth/${url}`, {
        username: username.trim(),
        password: password.trim()
      });

      if (response.data?.data?.id) {
        setLoggedInUsername(response.data.data.username);
        setId(response.data.data.id);
        setUsername('');
        setPassword('');
        router.push('/chat');
      } else {
        setError('Invalid response from server');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 400) {
        setError(`${isLoginOrRegister === 'register' ? 'Registration' : 'Login'} failed. Please check your credentials.`);
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 h-screen flex items-center justify-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-4 rounded-sm text-center text-sm">
            {error}
          </div>
        )}
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="Username"
          className="block w-full rounded-sm p-2 mb-2 border"
          autoComplete="username"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
          className="block w-full rounded-sm p-2 mb-2 border"
          autoComplete="current-password"
        />
        <button 
          className="bg-blue-500 text-white block w-full rounded-sm p-2"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' ? (
            <div>
              Already a member?
              <button
                type="button"
                className="ml-1 text-blue-500"
                onClick={() => setIsLoginOrRegister('login')}
              >
                Login here
              </button>
            </div>
          ) : (
            <div>
              Don't have an account?
              <button
                type="button"
                className="ml-1 text-blue-500"
                onClick={() => setIsLoginOrRegister('register')}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}