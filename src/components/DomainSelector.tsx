
import { MathDomain } from '@/pages/Index';

interface DomainSelectorProps {
  currentDomain: MathDomain;
  onDomainChange: (domain: MathDomain) => void;
}

const domains = [
  { id: 'topology', label: 'Topology', symbol: '𝒯', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' },
  { id: 'number-theory', label: 'Number Theory', symbol: 'ℕ', color: 'text-blue-400 bg-blue-500/20 border-blue-500/30' },
  { id: 'combinatorics', label: 'Combinatorics', symbol: 'ℂ', color: 'text-purple-400 bg-purple-500/20 border-purple-500/30' },
  { id: 'algebraic-geometry', label: 'Algebraic Geometry', symbol: '𝔸', color: 'text-orange-400 bg-orange-500/20 border-orange-500/30' },
  { id: 'analysis', label: 'Analysis', symbol: '∫', color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30' }
];

export const DomainSelector = ({ currentDomain, onDomainChange }: DomainSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="text-xs sm:text-sm font-medium text-gray-300 text-center lg:text-left">
        Mathematical Domain
      </div>
      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id as MathDomain)}
            className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 backdrop-blur-sm border touch-manipulation min-h-[44px] flex items-center ${
              currentDomain === domain.id
                ? domain.color + ' ring-2 ring-current/50 pulse-glow'
                : 'text-gray-400 bg-white/5 border-gray-600/30 hover:bg-white/10 hover:text-white hover:border-gray-500/50 active:scale-95'
            }`}
          >
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="text-base sm:text-lg">{domain.symbol}</span>
              <span className="hidden sm:inline lg:hidden xl:inline">{domain.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
