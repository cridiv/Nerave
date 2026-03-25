"use client";

import { useState } from 'react';
import { Nerave } from 'nerave-sdk';
import { useRouter } from 'next/navigation';

const nerave = new Nerave({
  apiKey: 'pk_test_xxx',
  baseUrl: 'http://localhost:3000'
});

export function AgreementForm() {
  const router = useRouter();
  const [contractor, setContractor] = useState('');
  const [total, setTotal] = useState('');
  const [milestones, setMilestones] = useState([{ title: '', amount: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMilestone = () => setMilestones([...milestones, { title: '', amount: '' }]);

  const updateMilestone = (index: number, field: 'title'|'amount', value: string) => {
    const updated = [...milestones];
    updated[index][field] = value;
    setMilestones(updated);
  };

  const handleSubmit = async () => {
    if (!contractor || !total || milestones.length === 0) return;
    
    setIsSubmitting(true);
    try {
      const parsedMilestones = milestones.map(m => ({ title: m.title, amount: Number(m.amount) }));
      
      const response = await nerave.agreements.create({
        contractorId: contractor,
        totalAmount: Number(total),
        milestones: parsedMilestones
      });

      alert(`Agreement Contract Deployed! View on dashboard.`);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert("Deployment failed. Is your backend running on port 3000 with a valid PRIVATE_KEY?");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Escrow Agreement</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Address / ID</label>
          <input 
            type="text" 
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
            placeholder="0x... or user_id" 
            className="w-full border p-2 rounded focus:ring-2 focus:ring-teal-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (USDT/ETH)</label>
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
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input 
                type="text" 
                value={m.title}
                onChange={(e) => updateMilestone(i, 'title', e.target.value)}
                placeholder="Title" 
                className="w-2/3 border p-2 rounded" 
              />
              <input 
                type="number" 
                value={m.amount}
                onChange={(e) => updateMilestone(i, 'amount', e.target.value)}
                placeholder="Amt" 
                className="w-1/3 border p-2 rounded" 
              />
            </div>
          ))}
          <button onClick={addMilestone} className="text-teal-600 text-sm font-medium hover:underline mt-2">+ Add Milestone</button>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-slate-900 text-white p-3 rounded-lg font-semibold hover:bg-slate-800 mt-6 transition-colors disabled:bg-slate-400"
        >
          {isSubmitting ? 'Deploying Smart Contract...' : 'Deploy Contract & Continue'}
        </button>
      </div>
    </div>
  );
}
