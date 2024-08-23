const WatchPageSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-md w-40 h-6 mb-4 shimmer 2xl:h-10 2xl:rounded-3xl 4k:h-16 4k:mb-8"></div>
      <div className="bg-gray-700 rounded-md w-full h-96 mb-4 shimmer 2xl:h-[60vh] 2xl:rounded-3xl 4k:mb-8"></div>
      <div className="bg-gray-700 rounded-md w-3/4 h-6 mb-2 shimmer 2xl:h-12 2xl:rounded-3xl 4k:h-24 4k:mb-6"></div>
      <div className="bg-gray-700 rounded-md w-1/2 h-6 mb-4 shimmer 2xl:h-12 2xl:rounded-3xl 4k:mb-8 4k:h-24"></div>
      <div className="bg-gray-700 rounded-md w-full h-24 shimmer 2xl:h-32 2xl:rounded-3xl 4k:h-64"></div>
    </div>
  );
};

export default WatchPageSkeleton;
