"use client";

import { MilestoneCard } from "@/components/MilestoneCard";
import { useState } from "react";

export default function DashboardPage() {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Figma Designs",
      amount: 500,
      status: "DISBURSED" as const,
    },
    {
      id: 2,
      title: "Frontend Dev",
      amount: 1500,
      status: "CONFIRMED_BY_ONE" as const,
    },
    { id: 3, title: "Backend API", amount: 1000, status: "PENDING" as const },
  ]);

  const handleConfirm = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "DISBURSED" } : m)),
    );
    alert(
      "Milestone confirmed on smart contract! Emits MilestoneApproved event.",
    );
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-1">Active Agreements</h3>
          <p className="text-3xl font-bold">1</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-1">Total Locked</h3>
          <p className="text-3xl font-bold text-teal-600">$3,000</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-gray-500 font-medium mb-1">Total Disbursed</h3>
          <p className="text-3xl font-bold text-gray-800">$500</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        Agreement: Website Build (0xA1...9B7)
      </h2>
      <div className="max-w-4xl">
        {milestones.map((m) => (
          <MilestoneCard
            key={m.id}
            id={m.id}
            title={m.title}
            amount={m.amount}
            status={m.status}
            role="CLIENT"
            onConfirm={handleConfirm}
          />
        ))}
      </div>
    </div>
  );
}
