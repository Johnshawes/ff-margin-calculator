import type { CalculatorResults } from '../types';
import { gpTrafficLight, labourTrafficLight, primeCostTrafficLight, overheadsTrafficLight, netProfitTrafficLight, getVerdict } from '../diagnostics';
import ResultsCard from './ResultsCard';

interface ResultsSectionProps {
  results: CalculatorResults;
}

function formatCurrency(n: number): string {
  if (n >= 0) return `£${n.toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
  return `-£${Math.abs(n).toLocaleString('en-GB', { maximumFractionDigits: 0 })}`;
}

function formatPct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}

export default function ResultsSection({ results }: ResultsSectionProps) {
  const hasRevenue = results.totalWeeklyRevenue > 0;

  if (!hasRevenue) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-4 text-center">
        <p className="text-muted text-sm">Enter your numbers above to see your margins</p>
      </div>
    );
  }

  const all = [
    gpTrafficLight(results.grossProfitPct),
    labourTrafficLight(results.labourPct),
    primeCostTrafficLight(results.primeCostPct),
    netProfitTrafficLight(results.netProfitPct),
  ];
  const dangers = all.filter(l => l === 'danger').length;
  const reds = all.filter(l => l === 'red' || l === 'danger').length;
  const verdictBg = dangers >= 1 ? 'bg-red-900/15 border-red-900/40' :
                    reds >= 2 ? 'bg-status-red/10 border-status-red/30' :
                    reds === 1 ? 'bg-status-amber/10 border-status-amber/30' :
                    'bg-status-green/10 border-status-green/30';

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-bold text-[#81CEE9] uppercase tracking-wider mb-1 pb-2 border-b border-[#81CEE9] font-heading">
          Your Margins
        </h3>
        <div className="divide-y divide-cream-dark">
          <ResultsCard
            label="Gross Profit"
            value={formatPct(results.grossProfitPct)}
            trafficLight={gpTrafficLight(results.grossProfitPct)}
            subValue={formatCurrency(results.grossProfit) + '/week'}
          />
          <ResultsCard
            label="Labour Cost"
            value={formatPct(results.labourPct)}
            trafficLight={labourTrafficLight(results.labourPct)}
          />
          <ResultsCard
            label="Prime Cost"
            value={formatPct(results.primeCostPct)}
            trafficLight={primeCostTrafficLight(results.primeCostPct)}
            subValue={formatCurrency(results.primeCost) + '/week'}
          />
          <ResultsCard
            label="Overheads"
            value={formatPct(results.totalWeeklyRevenue > 0 ? results.weeklyOverheads / results.totalWeeklyRevenue : 0)}
            trafficLight={overheadsTrafficLight(results.totalWeeklyRevenue > 0 ? results.weeklyOverheads / results.totalWeeklyRevenue : 0)}
            subValue={formatCurrency(results.weeklyOverheads) + '/week'}
          />
          <ResultsCard
            label="Net Profit"
            value={formatPct(results.netProfitPct)}
            trafficLight={netProfitTrafficLight(results.netProfitPct)}
            subValue={formatCurrency(results.netProfit) + '/week'}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="text-sm font-bold text-[#81CEE9] uppercase tracking-wider mb-3 pb-2 border-b border-[#81CEE9] font-heading">
          Owner Pay
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cream rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-charcoal">
              {formatCurrency(results.ownerHourlyRate)}
            </p>
            <p className="text-xs text-muted mt-1">Your hourly rate</p>
          </div>
          <div className="bg-cream rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-charcoal">
              {formatCurrency(results.annualisedNetProfit)}
            </p>
            <p className="text-xs text-muted mt-1">Annual net profit</p>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl border-2 p-5 ${verdictBg}`}>
        <h3 className="text-sm font-bold text-[#81CEE9] uppercase tracking-wider mb-2 font-heading">
          Your Verdict
        </h3>
        <p className="text-sm text-charcoal leading-relaxed font-medium">
          {getVerdict(results)}
        </p>
      </div>
    </div>
  );
}
