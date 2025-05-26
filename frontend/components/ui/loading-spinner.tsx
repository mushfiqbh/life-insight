const LoadingSpinner = () => {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-4">
      <div className="flex gap-2">
        <div className="w-2 h-5 animate-[ping_1.4s_linear_infinite] bg-sky-600"></div>
        <div className="w-2 h-5 animate-[ping_1.8s_linear_infinite] bg-sky-600"></div>
        <div className="w-2 h-5 animate-[ping_2s_linear_infinite] bg-sky-600"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
