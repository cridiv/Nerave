export interface MilestoneProps {
  id: number;
  title: string;
  amount: number;
  status: 'PENDING' | 'CONFIRMED_BY_ONE' | 'DISBURSED';
  onConfirm: (id: number) => void;
  role: 'CLIENT' | 'CONTRACTOR';
}

export function MilestoneCard({ id, title, amount, status, onConfirm, role }: MilestoneProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 shadow-sm bg-white mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className="text-lg font-medium text-teal-600">${amount.toLocaleString()}</span>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500 font-medium">Status:</span>
        <span className={`px-2 py-1 text-xs rounded-full font-semibold ${
          status === 'DISBURSED' ? 'bg-green-100 text-green-700' :
          status === 'CONFIRMED_BY_ONE' ? 'bg-yellow-100 text-yellow-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {status}
        </span>
      </div>

      <div className="flex justify-end">
        {status !== 'DISBURSED' && (
          <button
            onClick={() => onConfirm(id)}
            className="px-4 py-2 bg-navy-900 text-white rounded hover:bg-navy-800 transition-colors bg-slate-900"
          >
            Confirm as {role}
          </button>
        )}
      </div>
    </div>
  );
}
