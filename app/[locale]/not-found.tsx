import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <Image
        src="/logo.png"
        alt="Marabu Services"
        width={120}
        height={120}
        className="mb-8"
      />

      <h1 className="text-8xl font-bold text-[#1D4851] mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-[#1D4851] mb-4">
        Page introuvable
      </h2>

      <p className="text-gray-500 max-w-md mb-8 leading-relaxed">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-[#1D4851] text-white font-semibold rounded-lg hover:bg-[#689D71] transition-colors"
        >
          Retour à l&apos;accueil
        </Link>
        <Link
          href="/solutions"
          className="px-6 py-3 border-2 border-[#1D4851] text-[#1D4851] font-semibold rounded-lg hover:bg-[#1D4851] hover:text-white transition-colors"
        >
          Nos solutions
        </Link>
      </div>

      <div className="mt-12 w-full max-w-xs h-1 bg-gradient-to-r from-[#1D4851] to-[#689D71] rounded-full" />
    </div>
  );
}
