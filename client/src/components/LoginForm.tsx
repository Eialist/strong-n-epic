import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the interface for the login form props
interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

interface FormState {
  username: string;
  password: string;
}
const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [formState, setFormState] = useState<FormState>({
    username: "",
    password: "",
  });

  const { username, password } = formState;

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      username: e.target.value,
    }));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="container">
      <h2 className="mt-5">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            required
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
