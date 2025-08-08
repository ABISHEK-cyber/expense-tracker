import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp({ onSignUpSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async e => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password || !confirmPass) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPass) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      setLoading(false);
      if (onSignUpSuccess) onSignUpSuccess();
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: '80px auto',
        padding: 30,
        backgroundColor: '#121212',
        borderRadius: 12,
        boxShadow: '0 0 15px #00e5ff88',
        color: '#eee',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}
    >
      <h2 style={{ color: '#00e5ff', marginBottom: 20, textAlign: 'center' }}>
        Create a New Account
      </h2>
      <form onSubmit={handleSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
          required
          autoComplete="username"
        />

        <div style={{ position: 'relative' }}>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: 40 }}
            required
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={showPassBtnStyle}
            aria-label={showPass ? 'Hide password' : 'Show password'}
          >
            {showPass ? '🙈' : '👁️'}
          </button>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPass}
          onChange={e => setConfirmPass(e.target.value)}
          style={inputStyle}
          required
          autoComplete="new-password"
        />

        {error && (
          <div
            style={{
              backgroundColor: '#b71c1c',
              padding: '8px 12px',
              borderRadius: 6,
              color: '#fff',
              fontWeight: '700',
              fontSize: 14
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            backgroundColor: loading ? '#007c91' : '#00e5ff',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 8,
  border: '1.5px solid #00e5ff',
  backgroundColor: '#121212',
  color: '#eee',
  fontSize: 16,
  outline: 'none',
  boxSizing: 'border-box'
};

const showPassBtnStyle = {
  position: 'absolute',
  right: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '#00e5ff',
  fontSize: 18,
  cursor: 'pointer'
};

const buttonStyle = {
  padding: '14px',
  borderRadius: 10,
  border: 'none',
  fontWeight: '700',
  fontSize: 16,
  color: '#121212',
  transition: 'background-color 0.3s ease'
};
