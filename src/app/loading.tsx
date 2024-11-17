function Loading() {
  return (
    <div className="absolute inset-0 bg-white flex flex-col gap-4 justify-center items-center z-50">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Please wait!</h1>
      </div>
    </div>
  );
}
export default Loading;
