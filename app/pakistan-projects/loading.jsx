export default function Loading() {
  return (
    <div className="min-h-screen bg-black">
      <section className="relative pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-16 w-96 bg-white/5 rounded-lg mx-auto mb-6 animate-pulse" />
            <div className="h-6 w-[600px] bg-white/5 rounded-lg mx-auto animate-pulse" />
          </div>

          {/* Tabs Skeleton */}
          <div className="flex justify-center mb-16">
            <div className="h-14 w-96 bg-white/5 rounded-2xl animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
                <div className="h-80 bg-white/10 animate-pulse" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-white/10 rounded animate-pulse" />
                  <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                  <div className="h-20 bg-white/10 rounded animate-pulse" />
                  <div className="h-12 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
