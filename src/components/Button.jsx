const Button = ({ title, onClick, disabled }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 w-fit m-0 p-0">
      <button
        onClick={onClick}
        disabled={disabled}
        className="
      rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
      px-5 py-2.5 text-sm font-semibold text-white
      shadow-md shadow-blue-500/20
      transition-all duration-300 ease-out
      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30
      active:translate-y-0 active:scale-95
      focus-visible:outline-none focus-visible:ring-2
      focus-visible:ring-blue-500 focus-visible:ring-offset-2
      disabled:translate-y-0 disabled:scale-100
      disabled:cursor-not-allowed disabled:bg-none
      disabled:bg-gray-200 disabled:text-gray-400
      disabled:shadow-none disabled:hover:shadow-none cursor-pointer
    "
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
