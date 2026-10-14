const Sorting = ({
  name,
  value,
  onHandleChange,
  title,
  firstOption,
  firstOptionValue,
  secondOption,
  secondOptionValue,
}) => {
  return (
    <div className="relative w-full min-w-0 sm:min-w-[180px]">
      <select
        name={name}
        id={name}
        value={value}
        onChange={(event) => onHandleChange(event)}
        className="w-full cursor-pointer appearance-none truncate rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-800 shadow-sm outline-none transition duration-200 hover:border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 sm:py-3 sm:pl-3.5 sm:pr-10 sm:text-[0.95rem]"
      >
        <option value="">{title}</option>
        <option value={firstOptionValue}>{firstOption}</option>
        <option value={secondOptionValue}>{secondOption}</option>
      </select>

      {/* Custom dropdown arrow */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 sm:right-3.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  );
};

export default Sorting;
