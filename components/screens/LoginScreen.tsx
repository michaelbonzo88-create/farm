
import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CropIcon } from '../ui/Icons';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <CropIcon />
            </div>
            <h1 className="text-3xl font-bold text-green-800">Muchechetere Farm</h1>
            <p className="text-gray-600 mt-2">Agronomist Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <Input 
            id="username"
            label="Username"
            type="text"
            placeholder="e.g., john.doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="pt-2">
            <Button type="submit">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
