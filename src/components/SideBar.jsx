import { useState } from "react";
import { NavLink } from "react-router-dom";

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 11l9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1l1.7 1.7L12 21.5l7.1-7.1 1.7-1.7a5 5 0 0 0 0-7.1z" />
  </svg>
);

const links = [
  { to: "/", label: "Home", icon: <HomeIcon />, end: true },
  { to: "/my-favorite", label: "MyFavorite", icon: <HeartIcon /> },
];

export default function Sidebar() {
  return (
    <div className={`sidebar-spacer`}>
      <aside className={`sidebar `}>
        <nav className="sidebar__nav">
          {links.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
            >
              <span className="sidebar__icon">{icon}</span>
            </NavLink>
          ))}
        </nav>

        {/* <div className="sidebar__footer">
          <span className="sidebar__avatar">U</span>
          {!collapsed && <span className="sidebar__user">Your Account</span>}
        </div> */}
      </aside>
    </div>
  );
}
