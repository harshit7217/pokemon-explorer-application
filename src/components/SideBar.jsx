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
  { to: "/my-favorite", label: "My Favorite", icon: <HeartIcon /> },
];

export default function Sidebar() {
  return (
    <>
      {/* Desktop & tablet sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-16 border-r border-gray-200 bg-white shadow-sm sm:block lg:w-[70px]">
        <nav className="flex flex-col items-center gap-3 px-2 py-6">
          {links.map(({ to, label, icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={label}
              aria-label={label}
              className={({ isActive }) =>
                `flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-gray-500 hover:bg-gray-100 hover:text-blue-600"
                }`
              }
            >
              {icon}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-gray-200 bg-white/95 px-4 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_15px_rgba(0,0,0,0.05)] backdrop-blur-md sm:hidden">
        {links.map(({ to, label, icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-w-20 flex-col items-center justify-center gap-1 rounded-xl px-4 py-2 text-xs font-medium transition-colors ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-8 w-12 items-center justify-center rounded-xl transition-colors ${
                    isActive ? "bg-blue-50" : ""
                  }`}
                >
                  {icon}
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
