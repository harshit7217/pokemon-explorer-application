const TypeFilter = ({ isFilter, setIsFilter, typeFilterList }) => {
  return (
    <div className="w-full px-4 sm:pl-[70px] sm:pr-6">
      <div className="relative w-full sm:w-56">
        <select
          name="type"
          id="type"
          value={isFilter}
          onChange={(e) => setIsFilter(e.target.value)}
          className="w-full cursor-pointer appearance-none truncate rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm text-gray-900 shadow-sm transition hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        >
          <option value="">no filter</option>
          {typeFilterList.map((filter) => (
            <option key={filter.name} value={filter.url}>
              {filter.name}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default TypeFilter;
