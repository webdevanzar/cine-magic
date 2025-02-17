export const Skeleton = () => {
  return (
    <div
      role="status"
      // className="space-y-8 animate-pulse flex flex-col md:items-center px-5 py-10 bg-slate-900 rounded-2xl"
      className="w-[320px] h-[440px] md:flex justify-between md:w-[400px] md:h-[280px] rounded-lg shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-slate-900"
    >
      <div  className="w-[100%] h-[50%]  md:w-[40%] md:h-[100%] dark:bg-gray-700 rounded-lg">
        {/* <div className="md:w-1/3 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none md:rounded-tl-2xl"></div> */}
      </div>
      <div className="w-[100%] md:w-[65%] p-5">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
