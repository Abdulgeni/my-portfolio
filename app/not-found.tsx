import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0806] text-[#F5F1E8] flex flex-col items-center justify-center p-6 text-center font-mono">
      <h2 className="text-xl font-bold font-space mb-2 text-[#F5F1E8]">
        [404] Page Not Found
      </h2>
      <p className="text-sm text-[#A69A87] max-w-md mb-6 leading-relaxed">
        The requested resource could not be found.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-[#0A0806] text-xs font-bold font-mono transition-all shadow-[0_0_15px_rgba(217,119,6,0.4)]"
      >
        Return Home
      </Link>
    </div>
  );
}
