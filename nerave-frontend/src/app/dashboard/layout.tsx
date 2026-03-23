import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-[#0A0F1E] text-white p-6 hidden md:flex flex-col">
        <Link href="/" className="text-2xl font-bold text-[#00D4AA] mb-12">Nerave</Link>
        <nav className="flex flex-col gap-4 flex-1">
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition">Overview</Link>
          <Link href="/dashboard/agreements/new" className="text-gray-300 hover:text-white transition">New Agreement</Link>
          <Link href="/dashboard/settings" className="text-gray-300 hover:text-white transition">Settings</Link>
        </nav>
        <div className="mt-auto text-sm text-gray-500">
          Role: <span className="text-white font-semibold">Demo User</span>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <header className="mb-8 border-b pb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <Link 
            href="/dashboard/agreements/new" 
            className="bg-[#0A0F1E] text-white px-4 py-2 rounded font-medium hover:bg-gray-800"
          >
            + New Agreement
          </Link>
        </header>
        {children}
      </main>
    </div>
  );
}
