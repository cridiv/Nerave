import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl max-w-7xl w-full mx-auto flex flex-col items-center text-center space-y-12">
        <h1 className="text-6xl font-extrabold tracking-tight">
          Nerave <span className="text-[#00D4AA]">Trustless Escrow</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Nerve center of trust. Secure milestone payments for African businesses using smart contracts and Interswitch.
        </p>
        
        <div className="flex gap-4">
          <Link 
            href="/dashboard"
            className="px-8 py-4 bg-[#00D4AA] text-[#0A0F1E] font-bold rounded-lg hover:bg-teal-400 transition"
          >
            Go to Dashboard
          </Link>
          <a
            href="#how-it-works"
            className="px-8 py-4 border border-gray-600 rounded-lg font-semibold hover:border-gray-400 transition"
          >
            How it works
          </a>
        </div>

        <section id="how-it-works" className="w-full mt-24 pt-12 border-t border-gray-800">
          <h2 className="text-3xl font-bold mb-10">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <div className="text-[#00D4AA] font-bold text-2xl mb-2">1.</div>
              <h3 className="text-xl font-semibold mb-2">Create Agreement</h3>
              <p className="text-gray-400">Lock funds securely on-chain with clear milestones.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <div className="text-[#00D4AA] font-bold text-2xl mb-2">2.</div>
              <h3 className="text-xl font-semibold mb-2">Confirm Milestones</h3>
              <p className="text-gray-400">Client and Contractor both verify when work is done.</p>
            </div>
            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
              <div className="text-[#00D4AA] font-bold text-2xl mb-2">3.</div>
              <h3 className="text-xl font-semibold mb-2">Auto-Disburse</h3>
              <p className="text-gray-400">Funds are instantly settled via Interswitch rails.</p>
            </div>
          </div>
        </section>

        <section className="w-full mt-24 text-left bg-gray-900 p-8 rounded-xl font-mono text-sm border border-gray-800">
          <div className="text-gray-400 mb-2">// Nerave SDK Example</div>
          <code className="text-green-400">
            const nerave = new Nerave({`{ apiKey: 'pk_test_xxx' }`});<br/>
            await nerave.agreements.create({`{ ...details }`});
          </code>
        </section>
      </main>
    </div>
  );
}
