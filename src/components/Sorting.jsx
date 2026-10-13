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
    <div className="relative inline-block min-w-[180px]">
      <select
        name={name}
        id={name}
        value={value}
        onChange={() => onHandleChange(event)}
        className="w-full cursor-pointer appearance-none rounded-xl border-[1.5px] border-gray-300 bg-white py-2.5 pl-3.5 pr-10 text-[0.95rem] text-gray-800 shadow-sm outline-none transition hover:border-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20"
      >
        <option value="">{title}</option>
        <option value={firstOptionValue}>{firstOption}</option>
        <option value={secondOptionValue}>{secondOption}</option>
      </select>

      {/* custom dropdown arrow */}
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
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
