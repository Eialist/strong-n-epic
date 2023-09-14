import React from "react";
import { useNavigate } from "react-router-dom";
import gym from "../assets/gymlogo.png";

type NavProps = {
  btnText: String;
};

const Header = ({ btnText }: NavProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (btnText === "Login") {
      navigate("/login");
    } else if (btnText === "Log Out") {
      navigate("*");
      localStorage.removeItem("username");
    }
  };
  return (
    <div>
      <header
        style={{
          background: "lightgray",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: "1em",
        }}>
        <img
          alt="img"
          src={gym}
          style={{ width: "60px", height: "60px" }}></img>
        {/* <h1 style={{}}></h1> */}
        <input
          placeholder="Search..."
          className="rounded-pill px-2 border-0 border-gray"
          style={{ height: "25px", width: "300px" }}></input>
        <nav>
          <ul
            className="list-unstyled d-flex gap-3"
            style={{ fontSize: ".8em", marginTop: "1em" }}>
            <li>Home</li>
            <li>Services</li>
            <li>About us</li>
            <li>Contact</li>
          </ul>
        </nav>
        <button className="btn btn-primary" onClick={handleClick}>
          {btnText}
        </button>
      </header>
    </div>
  );
};

export default Header;
