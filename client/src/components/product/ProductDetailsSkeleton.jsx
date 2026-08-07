export default function ProductDetailsSkeleton() {
  return (
    <main className="bg-white min-h-screen pt-24 lg:pt-32 pb-20 animate-pulse">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left: Image Gallery Skeleton */}
          <div className="w-full lg:w-3/5 space-y-6">
            <div className="aspect-[4/5] bg-gray-100 rounded-sm"></div>
            <div className="grid grid-cols-5 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-sm"></div>
              ))}
            </div>
          </div>

          {/* Right: Product Info Skeleton */}
          <div className="w-full lg:w-2/5 space-y-10">
            <div className="space-y-6">
              <div className="flex gap-2">
                <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
                <div className="w-24 h-6 bg-gray-100 rounded-full"></div>
              </div>
              <div className="w-full h-12 bg-gray-200 rounded-sm"></div>
              <div className="w-3/4 h-12 bg-gray-200 rounded-sm"></div>

              <div className="flex items-center gap-4 py-8 border-y border-gray-100">
                <div className="flex-1 space-y-2">
                  <div className="w-16 h-3 bg-gray-100"></div>
                  <div className="w-32 h-8 bg-gray-200"></div>
                </div>
                <div className="w-[1px] h-10 bg-gray-100 mx-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-16 h-3 bg-gray-100"></div>
                  <div className="w-24 h-8 bg-gray-200"></div>
                </div>
              </div>
            </div>

            <div className="h-16 bg-gray-200 rounded-sm"></div>

            <div className="pt-10 space-y-6">
              <div className="w-32 h-4 bg-gray-100"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-100"></div>
                <div className="w-full h-4 bg-gray-100"></div>
                <div className="w-1/2 h-4 bg-gray-100"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-10">
              <div className="h-16 bg-gray-50 rounded-sm"></div>
              <div className="h-16 bg-gray-50 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
