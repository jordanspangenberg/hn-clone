import React from "react";
import { ThemeConsumer } from "../context/theme";
import { NavLink } from 'react-router-dom'

const activeStyle = {
  color: "rgb(187, 46, 31)"
};

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
              exact
              to='/'
              activeStyle={activeStyle}
              className='nav-link'
              >
                Top
              </NavLink>
            </li>
            <li>
              <NavLink
              exact
              to='/new'
              activeStyle={activeStyle}
              className='nav-link'
              >
              New
              </NavLink>

            </li>
            <li>
              <NavLink
              exact
              to='/best'
              activeStyle={activeStyle}
              className='nav-link'
              >
                Best
              </NavLink>

            </li>
          </ul>
          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🌙" : "💡"}
          </button>
        </nav>
      )}
    </ThemeConsumer>
  );
}
