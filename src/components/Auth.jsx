import React, { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      style={{
        maxWidth: 420,
        margin: '60px auto',
        padding: 20,
        backgroundColor: '#121212',
        borderRadius: 12,
        boxShadow: '0 0 15px #00e5ff88',
        color: '#eee',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      {isLogin ? <Login /> : <SignUp />}
      <div
        onClick={() => setIsLogin(!isLogin)}
        style={{
          marginTop: 20,
          textAlign: 'center',
          color: '#00e5ff',
          cursor: 'pointer',
          userSelect: 'none',
          fontWeight: '600'
        }}
      >
        {isLogin
          ? "Don't have an account? Sign Up"
          : 'Already have an account? Login'}
      </div>
    </div>
  );
}
