const GridSkeleton = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-2 gap-3 max-h-48 overflow-hidden pr-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-2xl border-2 border-gray-100 bg-gray-50 animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded-md w-1/2" />
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;