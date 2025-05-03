'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-white text-gray-800 px-6">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4">Witamy w VoteForGift!</h1>
        <p className="text-lg mb-8">
          Doświadcz nowego poziomu zaangażowania społeczności. Twórz głosowania, dziel się opiniami i uczestnicz w innowacyjnym systemie nagród. Twoja opinia ma znaczenie!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/login')}
            className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold rounded-xl shadow-md transition"
          >
            Zaloguj się
          </button>
          <button
            onClick={() => router.push('/register')}
            className="px-6 py-3 bg-white border border-yellow-400 text-yellow-500 hover:bg-yellow-100 font-semibold rounded-xl shadow-md transition"
          >
            Zarejestruj się
          </button>
        </div>
      </div>
    </main>
  );
}
