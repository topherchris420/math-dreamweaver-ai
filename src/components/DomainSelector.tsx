
import { MathDomain } from '@/pages/Index';

interface DomainSelectorProps {
  currentDomain: MathDomain;
  onDomainChange: (domain: MathDomain) => void;
}

const domains = [
  { id: 'topology', label: 'Topology', symbol: '𝒯', color: 'from-green-400 to-teal-500' },
  { id: 'number-theory', label: 'Number Theory', symbol: 'ℕ', color: 'from-blue-400 to-cyan-500' },
  { id: 'combinatorics', label: 'Combinatorics', symbol: 'ℂ', color: 'from-purple-400 to-pink-500' },
  { id: 'algebraic-geometry', label: 'Algebraic Geometry', symbol: '𝔸', color: 'from-orange-400 to-red-500' },
  { id: 'analysis', label: 'Analysis', symbol: '∫', color: 'from-indigo-400 to-purple-500' }
];

export const DomainSelector = ({ currentDomain, onDomainChange }: DomainSelectorProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-blue-300 mr-2">Mathematical Domain:</span>
      <div className="flex space-x-1">
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id as MathDomain)}
            className={`relative group px-4 py-2 rounded-lg border transition-all duration-300 ${
              currentDomain === domain.id
                ? 'bg-gradient-to-r ' + domain.color + ' text-white border-transparent shadow-lg'
                : 'bg-slate-800/50 text-blue-200 border-blue-700/30 hover:border-blue-500/50 hover:bg-slate-700/50'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold">{domain.symbol}</span>
              <span className="text-sm font-medium">{domain.label}</span>
            </div>
            
            {/* Tooltip */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              Explore {domain.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
