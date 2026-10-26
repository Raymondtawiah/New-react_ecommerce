import React from 'react';
import { ShieldCheck, Truck, Store, Smartphone } from 'lucide-react';

export const ValuePropositionCards: React.FC = () => {
  const cards = [
    {
      title: '100% Genuine Tech',
      description: 'Direct from official manufacturer factories with authentic seals.',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    },
    {
      title: 'Nationwide Dispatch',
      description: 'Express delivery to all 16 regions across Ghana within 24 hours.',
      icon: Truck,
      iconBg: 'bg-rose-50 text-rose-500 border border-rose-100',
    },
    {
      title: '35+ Showrooms',
      description: 'Pick up in Accra, Kumasi, Takoradi, Sunyani, Tamale & more.',
      icon: Store,
      iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
    {
      title: 'ApexTech Warranty',
      description: '12-month comprehensive parts and labor warranty support.',
      icon: Smartphone,
      iconBg: 'bg-emerald-50 text-emerald-500 border border-emerald-100',
    },
  ];

  return (
    <section className="mt-12 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-start gap-3.5"
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${card.iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 tracking-tight">
                  {card.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
