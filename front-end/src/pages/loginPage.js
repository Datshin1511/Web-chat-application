import React, { useState } from 'react';

function LoginPage() {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleLogin = () => {
    console.log('Logging in with username:', username);
  };

  return (
    <div className="container-lg">
      <h1 className="display-6">Welcome to the Chat!</h1>
      <div className="form-control">
        <label htmlFor="username">Enter your name:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="form-control"
          placeholder="Your name"
        />
        <button onClick={handleLogin} className="btn btn-primary">Login</button>
      </div>
    </div>
  );
}

export default LoginPage;