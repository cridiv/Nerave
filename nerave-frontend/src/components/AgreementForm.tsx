"use client";

import { useState } from 'react';

export function AgreementForm() {
  const [title, setTitle] = useState('');
  const [total, setTotal] = useState('');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Agreement</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Address</label>
          <input 
            type="text" 
            placeholder="0x..." 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (USDT/Sepolia ETH)</label>
          <input 
            type="number" 
            value={total}
            onChange={(e) => setTotal(e.target.value)}
            placeholder="e.g. 1000" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none" 
          />
        </div>
        
        <div className="pt-4 border-t mt-4">
          <h3 className="text-lg font-semibold mb-3">Milestones</h3>
          <div className="flex gap-2 mb-2">
            <input type="text" placeholder="Title" className="w-2/3 border p-2 rounded" />
            <input type="number" placeholder="Amt" className="w-1/3 border p-2 rounded" />
          </div>
          <button className="text-teal-600 text-sm font-medium hover:underline">+ Add Milestone</button>
        </div>

        <button className="w-full bg-slate-900 text-white p-3 rounded-lg font-semibold hover:bg-slate-800 mt-6 transition-colors">
          Deploy Contract & Continue
        </button>
      </div>
    </div>
  );
}
