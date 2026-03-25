"use client";

import { MilestoneCard } from '@/components/MilestoneCard';
import { useState, useEffect } from 'react';
import { Nerave, AgreementState, Milestone } from 'nerave-sdk';

const nerave = new Nerave({
  apiKey: 'pk_test_xxx',
  baseUrl: 'http://localhost:3000' // Assuming NestJS runs on 3000
});

export default function DashboardPage() {
  const [agreement, setAgreement] = useState<AgreementState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch the agreements assigned to the user.
    // Here we just fetch a hardcoded mock ID for demonstration
    const fetchAgreement = async () => {
      try {
        const state = await nerave.agreements.getStatus('recent-agreement-id');
        setAgreement(state);
      } catch (err) {
        console.error("Failed to fetch real agreement state", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgreement();
  }, []);

  const handleConfirm = async (id: number) => {
    if (!agreement) return;

    try {
      await nerave.milestones.confirm({
        agreementId: agreement.id,
        milestoneId: id,
        role: 'CLIENT'
      });
      alert('Milestone confirmed via API! Emits MilestoneApproved event on-chain.');
      // Re-fetch to see updated state
      const updatedState = await nerave.agreements.getStatus(agreement.id);
      setAgreement(updatedState);
    } catch (err) {
      alert("Error confirming milestone. Make sure API is running.");
      console.error(err);
    }
  };

  if (loading) return <div className="p-10">Loading real data from smart contract...</div>;

  if (!agreement) {
    return (
      <div className="p-10 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-2">No Active Agreements Found</h2>
        <p className="text-gray-500 mb-4">Start by creating a new agreement to see it lock funds on-chain.</p>
      </div>
    );
  }

  const lockedAmt = agreement.totalAmount || 0;
  const disbursedAmt = agreement.milestones.filter(m => m.disbursed).reduce((acc, m) => acc + m.amount, 0);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-1">Active Agreements</h3>
          <p className="text-3xl font-bold">1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-1">Total Locked</h3>
          <p className="text-3xl font-bold text-teal-600">${lockedAmt.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-1">Total Disbursed</h3>
          <p className="text-3xl font-bold text-gray-800">${disbursedAmt.toLocaleString()}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Agreement: (Contract {agreement.contractAddress?.slice(0, 10)}...)</h2>
      <div className="max-w-4xl">
        {agreement.milestones.map((m: Milestone) => (
          <MilestoneCard 
            key={m.id}
            id={m.id}
            title={m.title}
            amount={m.amount}
            status={m.disbursed ? 'DISBURSED' : (m.clientConfirmed || m.contractorConfirmed ? 'CONFIRMED_BY_ONE' : 'PENDING')}
            role="CLIENT"
            onConfirm={handleConfirm}
          />
        ))}
      </div>
    </div>
  );
}
