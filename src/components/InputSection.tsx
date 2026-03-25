import type { ReactNode } from 'react';

interface InputSectionProps {
  title: string;
  children: ReactNode;
}

export default function InputSection({ title, children }: InputSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
      <h3 className="text-sm font-bold text-[#81CEE9] uppercase tracking-wider mb-1 pb-2 border-b border-[#81CEE9] font-heading">
        {title}
      </h3>
      <div className="divide-y divide-cream-dark">
        {children}
      </div>
    </div>
  );
}
