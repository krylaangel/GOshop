export function UserProfileSkeleton() {
  return (
    <div className="clamp py-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-x-4 py-4">
        <div className="space-y-2">
          <div className="w-full h-10 bg-gray-300 rounded rounded-[10px]"></div>
          <div className="w-full h-10 bg-gray-300 rounded rounded-[10px]"></div>
          <div className="w-full h-10 bg-gray-300 rounded rounded-[10px]"></div>
        </div>

        <div>
          <div className="h-8 w-1/3 bg-gray-300 rounded rounded-[10px] mb-4"></div>

          <div className="space-y-4">

            <div className="flex flex-col gap-3 animate-pulse">
              <h2 className="w-full bg-gray-300 rounded-lg p-3">Особисті данні:</h2>
              <div className="space-y-6 mt-4">
                <div className="h-10 bg-gray-300 rounded rounded-[10px] w-full"></div>
                <div className="h-10 bg-gray-300 rounded rounded-[10px] w-full"></div>
                <div className="h-10 bg-gray-300 rounded rounded-[10px] w-full"></div>
                <div className="h-6 bg-gray-300 rounded rounded-[10px] w-1/3"></div>
                <div className="h-10 bg-gray-300 rounded rounded-[10px]  w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-end mt-4">
        <div className="h-10 w-32 bg-gray-300 rounded rounded-[10px]"></div>
      </div>
    </div>
  )
}
