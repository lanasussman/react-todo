import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink
            exact
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/new"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            New Todo List
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;