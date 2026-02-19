export default function Loading() {
  return (
    <div className="min-h-screen bg-[#7a2e2e] flex items-center justify-center">

      <div className="flex flex-col items-center gap-6">

        {/* Animated Gold Circle */}
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />

        <p className="text-amber-300 text-sm tracking-widest">
          Loading Menu...
        </p>

      </div>
    </div>
  );
}
