const Button = ({ title, onClick, disabled }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-4 mx-auto w-fit p-3 rounded-2xl bg-white/80">
      <button
        onClick={onClick}
        disabled={disabled}
        className="px-4 py-2 rounded-full border border-blue-500 bg-blue-500 text-white text-sm font-medium shadow-sm transition-all duration-200
          hover:bg-white hover:text-blue-500 hover:shadow-md active:scale-95 cursor-pointer
          disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-400 disabled:shadow-none
          disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-400 disabled:hover:shadow-none disabled:active:scale-100"
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
