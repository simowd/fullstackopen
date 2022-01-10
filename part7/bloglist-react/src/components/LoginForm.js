import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
                username
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login-button'>login</button>
    </form>
  )
}

export default LoginForm