import { useState, useMemo } from 'react';
import type { CalculatorInputs } from './types';
import { calculate } from './calculations';
import { getDiagnostics, gpTrafficLight, labourTrafficLight, primeCostTrafficLight, overheadsTrafficLight, netProfitTrafficLight, getVerdict } from './diagnostics';
import InputSection from './components/InputSection';
import InputField from './components/InputField';
import ResultsSection from './components/ResultsSection';
import DiagnosticsSection from './components/DiagnosticsSection';

const BOOKING_URL = 'https://flavourfounders.com/2---vsl-page-page-8829';
const AUDIT_API_URL = import.meta.env.VITE_AUDIT_API_URL || 'https://ff-audit-generator-production.up.railway.app';

const initialInputs: CalculatorInputs = {
  counterSales: 0,
  wholesaleSales: 0,
  onlineSales: 0,
  cateringSales: 0,
  ingredientsSpend: 0,
  packagingSpend: 0,
  wastagePercent: 0,
  totalWeeklyWages: 0,
  staffCount: 0,
  ownerHoursPerWeek: 0,
  rent: 0,
  utilities: 0,
  insurance: 0,
  equipment: 0,
  marketing: 0,
  otherCosts: 0,
};

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(initialInputs);

  const [saving, setSaving] = useState(false);

  const update = (field: keyof CalculatorInputs) => (value: number) =>
    setInputs((prev) => ({ ...prev, [field]: value }));

  const results = useMemo(() => calculate(inputs), [inputs]);
  const diagnostics = useMemo(() => getDiagnostics(results), [results]);

  const handleCTA = async () => {
    setSaving(true);
    try {
      const payload = {
        ...inputs,
        ...results,
        gpRating: gpTrafficLight(results.grossProfitPct),
        labourRating: labourTrafficLight(results.labourPct),
        primeCostRating: primeCostTrafficLight(results.primeCostPct),
        overheadsRating: overheadsTrafficLight(results.netProfitPct < 0.05 ? 0.16 : 0.09),
        netProfitRating: netProfitTrafficLight(results.netProfitPct),
        verdict: getVerdict(results),
      };
      const resp = await fetch(`${AUDIT_API_URL}/api/calculator-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const { calc_id } = await resp.json();
      window.location.href = `${BOOKING_URL}?calc_id=${calc_id}`;
    } catch {
      window.location.href = BOOKING_URL;
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-[#FFD230]">
        <div className="max-w-lg mx-auto px-5 py-8 text-center">
          <p className="text-charcoal/60 text-xs font-semibold uppercase tracking-widest mb-2">
            Flavour Founders
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F9FAEB] leading-tight font-heading">
            The Bakery Margin Calculator
          </h1>
          <p className="text-charcoal/70 text-sm mt-2">
            Find out where your money is really going. Takes 2 minutes.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        <InputSection title="Revenue">
          <InputField label="Weekly counter/shop sales" value={inputs.counterSales} onChange={update('counterSales')} />
          <InputField label="Weekly wholesale sales" value={inputs.wholesaleSales} onChange={update('wholesaleSales')} />
          <InputField label="Weekly online sales" value={inputs.onlineSales} onChange={update('onlineSales')} />
          <InputField label="Weekly catering/events" value={inputs.cateringSales} onChange={update('cateringSales')} />
        </InputSection>

        <InputSection title="Cost of Goods">
          <InputField label="Weekly ingredients spend" value={inputs.ingredientsSpend} onChange={update('ingredientsSpend')} />
          <InputField label="Weekly packaging spend" value={inputs.packagingSpend} onChange={update('packagingSpend')} />
          <InputField label="Estimated wastage" value={inputs.wastagePercent} onChange={update('wastagePercent')} prefix="" suffix="%" placeholder="10" />
        </InputSection>

        <InputSection title="Labour">
          <InputField label="Total weekly wages (inc. owner)" value={inputs.totalWeeklyWages} onChange={update('totalWeeklyWages')} />
          <InputField label="Number of staff (inc. owner)" value={inputs.staffCount} onChange={update('staffCount')} prefix="" placeholder="1" />
          <InputField label="Owner hours per week" value={inputs.ownerHoursPerWeek} onChange={update('ownerHoursPerWeek')} prefix="" placeholder="40" />
        </InputSection>

        <InputSection title="Fixed Overheads (Monthly)">
          <InputField label="Rent" value={inputs.rent} onChange={update('rent')} />
          <InputField label="Utilities" value={inputs.utilities} onChange={update('utilities')} />
          <InputField label="Insurance" value={inputs.insurance} onChange={update('insurance')} />
          <InputField label="Equipment / maintenance" value={inputs.equipment} onChange={update('equipment')} />
          <InputField label="Marketing" value={inputs.marketing} onChange={update('marketing')} />
          <InputField label="Other costs" value={inputs.otherCosts} onChange={update('otherCosts')} />
        </InputSection>

        {/* Results */}
        <ResultsSection results={results} />

        {/* Diagnostics */}
        <DiagnosticsSection diagnostics={diagnostics} />

        {/* CTA */}
        {results.totalWeeklyRevenue > 0 && (
          <div className="bg-[#FFD230] rounded-2xl p-6 text-center mt-6">
            <h3 className="text-lg font-bold text-charcoal mb-2 font-heading">
              Want help fixing these numbers?
            </h3>
            <p className="text-charcoal/70 text-sm mb-4">
              Book a free discovery call and we'll show you exactly how to fix your margins.
            </p>
            <button
              onClick={handleCTA}
              disabled={saving}
              className="inline-block bg-charcoal text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-charcoal/80 transition-colors disabled:opacity-50"
            >
              {saving ? 'Loading...' : 'Find Out More'}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-xs text-muted">
            Built by Flavour Founders — helping bakery owners get profitable.
          </p>
        </div>
      </div>
    </div>
  );
}
