interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}

export default function InputField({ label, value, onChange, prefix = '£', suffix, placeholder = '0' }: InputFieldProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <label className="text-sm font-medium text-charcoal leading-tight flex-1">
        {label}
      </label>
      <div className="relative w-28 shrink-0">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          placeholder={placeholder}
          className={`w-full bg-input-bg border-b-2 border-terracotta focus:border-charcoal rounded-lg py-2.5 text-sm text-charcoal text-right outline-none transition-colors ${prefix ? 'pl-7 pr-3' : 'px-3'} ${suffix ? 'pr-7' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
