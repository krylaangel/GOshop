
export function ProductCardSkeleton() {

    return (
        <div className="h-full w-full flex flex-col gap-y-[10px] sm:gap-y-2 animate-pulse">
            {/* img */}
            <div className="h-[369px] w-full bg-gray-200 rounded-[10px]" />

            {/* brand */}
            <div className="w-3/4 bg-gray-200 rounded-[10px] mb-5 h-10 w-full" />

            {/* rating */}
            <div className="flex items-center gap-x-1 pb-[10px] justify-end w-full">
                <div className="h-4 w-24 bg-gray-200 rounded-[10px]" />
            </div>

            {/* price */}
            <div className="flex gap-x-2 h-7 w-full justify-between">
                <div className="h-5 w-16 bg-gray-200 rounded-[10px]" />
                <div className="h-5 w-12 bg-gray-200 rounded-[10px]" />
            </div>

            {/* button */}
            <div className="flex justify-between gap-x-2 py-[10px] sm:py-4">
                <div className="h-10 w-3/4 bg-gray-200 rounded-[10px]" />
                <div className="h-10 w-1/4 bg-gray-200 rounded-[10px]" />
            </div>
        </div>
    )
}
