import type { Diagnostic } from '../diagnostics';

interface DiagnosticsSectionProps {
  diagnostics: Diagnostic[];
}

export default function DiagnosticsSection({ diagnostics }: DiagnosticsSectionProps) {
  const visible = diagnostics.filter(d => d.show);
  if (visible.length === 0) return null;

  return (
    <div className="space-y-3 mt-4">
      <h3 className="text-sm font-bold text-[#81CEE9] uppercase tracking-wider font-heading">
        Where You're Leaking
      </h3>
      {visible.map((d) => (
        <div key={d.title} className="bg-white rounded-2xl shadow-sm p-5">
          <h4 className="text-sm font-bold text-[#81CEE9] mb-2">{d.title}</h4>
          <p className="text-sm text-charcoal leading-relaxed mb-3">{d.body}</p>
          <p className="text-sm font-bold text-charcoal">
            This is exactly what we fix in the Flavour Founders programme.
          </p>
        </div>
      ))}
    </div>
  );
}
