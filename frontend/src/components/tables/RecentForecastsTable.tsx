import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ForecastLog {
  id: string;
  commodity: string;
  market: string;
  state: string;
  predictedPrice: number;
  confidence: number;
  targetDate: string;
  status: 'Strong Buy' | 'Neutral' | 'Watch Market' | 'Hold';
}

const mockLogs: ForecastLog[] = [
  { id: '1', commodity: 'Cotton (Kapas)', market: 'Rajkot APMC', state: 'Gujarat', predictedPrice: 7650, confidence: 94.8, targetDate: '15 Jul 2026', status: 'Strong Buy' },
  { id: '2', commodity: 'Wheat (Gehun)', market: 'Auraiya Mandi', state: 'Uttar Pradesh', predictedPrice: 2520, confidence: 96.2, targetDate: '10 Jul 2026', status: 'Strong Buy' },
  { id: '3', commodity: 'Potato (Aloo)', market: 'Deesa APMC', state: 'Gujarat', predictedPrice: 1720, confidence: 94.5, targetDate: '22 Jul 2026', status: 'Hold' },
  { id: '4', commodity: 'Onion (Pyaz)', market: 'Hapur Mandi', state: 'Uttar Pradesh', predictedPrice: 1600, confidence: 92.5, targetDate: '12 Jul 2026', status: 'Watch Market' },
  { id: '5', commodity: 'Groundnut', market: 'Gondal APMC', state: 'Gujarat', predictedPrice: 7150, confidence: 95.1, targetDate: '18 Jul 2026', status: 'Strong Buy' },
  { id: '6', commodity: 'Soybean', market: 'Kanpur Yard', state: 'Uttar Pradesh', predictedPrice: 4680, confidence: 93.9, targetDate: '25 Jul 2026', status: 'Neutral' },
  { id: '7', commodity: 'Mustard (Sarson)', market: 'Hapur Mandi', state: 'Uttar Pradesh', predictedPrice: 5890, confidence: 91.2, targetDate: '08 Jul 2026', status: 'Hold' },
];

const RecentForecastsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(mockLogs.length / itemsPerPage);

  const paginatedLogs = mockLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColors = {
    'Strong Buy': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Neutral': 'bg-gray-50 text-gray-700 border-gray-150',
    'Watch Market': 'bg-amber-50 text-amber-700 border-amber-200',
    'Hold': 'bg-blue-50 text-blue-700 border-blue-200',
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-150/60 shadow-[0_4px_25px_rgba(0,0,0,0.02)] overflow-hidden w-full">
      <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-text-dark">Recent AI Predictions Log</h2>
          <p className="text-xs text-gray-400 mt-1">Audit log tracking verified forecast cycles across regional nodes.</p>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th scope="col" className="px-6 py-4">Commodity</th>
              <th scope="col" className="px-6 py-4">APMC Mandi</th>
              <th scope="col" className="px-6 py-4">Predicted Price</th>
              <th scope="col" className="px-6 py-4">Confidence</th>
              <th scope="col" className="px-6 py-4">Target Date</th>
              <th scope="col" className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50/40 transition-colors duration-150">
                <td className="px-6 py-4 font-extrabold text-text-dark">
                  {log.commodity}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-600">
                  {log.market} <span className="text-[10px] font-bold text-gray-400 block">{log.state}</span>
                </td>
                <td className="px-6 py-4 font-black text-text-dark">
                  ₹{log.predictedPrice.toLocaleString('en-IN')}<span className="text-[10px] font-bold text-gray-400">/Qtl</span>
                </td>
                <td className="px-6 py-4 font-extrabold text-primary-green">
                  {log.confidence}%
                </td>
                <td className="px-6 py-4 font-semibold text-gray-600">
                  {log.targetDate}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block text-[10px] font-bold border px-2 py-0.5 rounded-lg ${statusColors[log.status] || 'bg-gray-50'}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination panel */}
      {totalPages > 1 && (
        <div className="p-4 bg-gray-50/20 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-semibold">
            Showing Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors duration-150"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer transition-colors duration-150"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentForecastsTable;
