
import { MathDomain } from '@/pages/Index';

interface DomainSelectorProps {
  currentDomain: MathDomain;
  onDomainChange: (domain: MathDomain) => void;
}

const domains = [
  { id: 'topology', label: 'Topology', symbol: '𝒯', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' },
  { id: 'number-theory', label: 'Number Theory', symbol: 'ℕ', color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400' },
  { id: 'combinatorics', label: 'Combinatorics', symbol: 'ℂ', color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400' },
  { id: 'algebraic-geometry', label: 'Algebraic Geometry', symbol: '𝔸', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400' },
  { id: 'analysis', label: 'Analysis', symbol: '∫', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400' }
];

export const DomainSelector = ({ currentDomain, onDomainChange }: DomainSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Mathematical Domain
      </div>
      <div className="flex flex-wrap gap-2">
        {domains.map((domain) => (
          <button
            key={domain.id}
            onClick={() => onDomainChange(domain.id as MathDomain)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              currentDomain === domain.id
                ? domain.color + ' ring-2 ring-offset-2 ring-current ring-offset-white dark:ring-offset-gray-900'
                : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{domain.symbol}</span>
              <span className="hidden sm:inline">{domain.label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
