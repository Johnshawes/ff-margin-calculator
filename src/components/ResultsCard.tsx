import type { TrafficLight } from '../types';

interface ResultsCardProps {
  label: string;
  value: string;
  trafficLight: TrafficLight;
  subValue?: string;
}

const lightStyles: Record<TrafficLight, string> = {
  green: 'bg-status-green text-white',
  amber: 'bg-status-amber text-white',
  red: 'bg-status-red text-white',
  danger: 'bg-red-800 text-white animate-pulse',
  none: 'bg-gray-200 text-muted',
};

const lightLabels: Record<TrafficLight, string> = {
  green: 'Healthy',
  amber: 'Warning',
  red: 'Danger',
  danger: 'Critical',
  none: '—',
};

export default function ResultsCard({ label, value, trafficLight, subValue }: ResultsCardProps) {
  return (
    <div className="flex items-center justify-between py-4 gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-charcoal">{label}</p>
        {subValue && <p className="text-xs text-muted mt-0.5">{subValue}</p>}
      </div>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="text-lg font-bold text-charcoal tabular-nums">{value}</span>
        {trafficLight !== 'none' && (
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${lightStyles[trafficLight]}`}>
            {lightLabels[trafficLight]}
          </span>
        )}
      </div>
    </div>
  );
}
