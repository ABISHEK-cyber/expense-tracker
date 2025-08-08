import React, { useState } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function SignUp() {
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
      // Redirect handled by App.js router
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSignUp} style={formStyle}>
        <h2 style={titleStyle}>Create a New Account</h2>

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

        {error && <div style={errorStyle}>{error}</div>}

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

        <div style={toggleTextStyle}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#00e5ff', textDecoration: 'none' }}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: 420,
  margin: '60px auto',
  padding: 20,
  backgroundColor: '#121212',
  borderRadius: 12,
  boxShadow: '0 0 15px #00e5ff88',
  color: '#eee',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 15
};

const titleStyle = {
  color: '#00e5ff',
  marginBottom: 20,
  textAlign: 'center'
};

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

const errorStyle = {
  backgroundColor: '#b71c1c',
  padding: '8px 12px',
  borderRadius: 6,
  color: '#fff',
  fontWeight: '700',
  fontSize: 14
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

const toggleTextStyle = {
  marginTop: 20,
  textAlign: 'center',
  fontSize: 14,
  color: '#eee'
};
