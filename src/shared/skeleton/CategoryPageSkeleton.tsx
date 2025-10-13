export function CategoryPageSkeleton({ isDesktop }: { isDesktop: boolean }) {
  const productSkeletons = Array.from({ length: 6 })

  return (
    <div className="animate-pulse">
      <div className={`grid gap-4 ${
        isDesktop ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
      }`}
      >
        {productSkeletons.map((_, idx) => (
          <div key={idx} className="w-full bg-gray-200 rounded-[10px] p-4 flex flex-col gap-2">
            <div className="w-full h-[369px] bg-gray-300 rounded-[10px]"></div>
            <div className="h-6 bg-gray-300 rounded-[10px] w-3/4"></div>
            <div className="h-6 bg-gray-300 rounded-[10px] w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
