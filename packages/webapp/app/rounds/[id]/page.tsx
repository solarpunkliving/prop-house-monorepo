"use client";

import Link from "next/link";
import { Header } from "@/components/Header";

interface RoundParams {
  params: Promise<{ id: string }>;
}

const STATUS_COLORS = {
  active: "bg-green-500/20 text-green-400 border-green-500/30",
  finalized: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function RoundDetailPage({ params }: RoundParams) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to Houses
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Skateboard Deck Design Contest
                </h1>
                <span className={`px-2 py-1 rounded-full text-xs border ${STATUS_COLORS.active}`}>
                  active
                </span>
              </div>

              <p className="text-gray-400">
                Submit your best skateboard deck designs. Community votes on the winner who takes home the prize pool.
              </p>
            </div>

            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
              <h2 className="text-lg font-semibold text-white mb-4">Submissions</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-800 rounded-lg bg-black/50">
                    <div>
                      <h3 className="font-medium text-white">Deck Design #{i}</h3>
                      <p className="text-sm text-gray-400 mt-1">by 0x{i}23...{i}78</p>
                    </div>
                    <button className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-sm transition-colors">
                      Vote
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-white font-medium transition-colors">
              Submit Your Entry
            </button>
          </div>

          <div className="space-y-6">
            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
              <h2 className="text-lg font-semibold text-white mb-4">Round Details</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-400">Prize Pool</dt>
                  <dd className="text-white font-medium">2.5 ETH</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400">Voting Strategy</dt>
                  <dd className="text-white font-medium">1 Vote Per Wallet</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400">Payout Type</dt>
                  <dd className="text-white font-medium">Lump Sum</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400">Manager</dt>
                  <dd className="text-white font-mono text-sm">0x1234...5678</dd>
                </div>
              </dl>
            </div>

            <div className="border border-gray-800 rounded-xl p-6 bg-gray-900/50">
              <h2 className="text-lg font-semibold text-white mb-4">Manager Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                  Finalize Round
                </button>
                <button className="w-full px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                  Cancel Round
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
