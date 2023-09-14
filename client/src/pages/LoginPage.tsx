import React from "react";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Handle login logic here
  const handleLogin = async (username: string, password: string) => {
    // Implement your login logic, e.g., make API requests
    try {
      // Make a POST request to the authentication endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 201) {
        const data = await response.json();

        const user = data.user;

        const id = user.id;
        const username = user.username;
        const role = user.role;
        // Store username in localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("userId", id);

        // Navigate based on the user's role
        if (role === "ADMIN") {
          navigate("/admin");
        } else if (role === "USER") {
          navigate("/userbooking");
        }
      } else {
        // Handle login error, e.g., display an error message
        console.log("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Header btnText={"Login"} />
      <div
        style={{
          margin: "auto",
          width: "50%",
          textAlign: "center",
          height: "62vh",
        }}>
        <LoginForm onLogin={handleLogin} />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
