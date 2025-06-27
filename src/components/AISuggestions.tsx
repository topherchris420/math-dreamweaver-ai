
import { MathDomain } from '@/pages/Index';

interface AISuggestionsProps {
  domain: MathDomain;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const AISuggestions = ({ domain, suggestions, onSuggestionClick }: AISuggestionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold text-green-300 mb-2">AI Suggestions for {domain}:</h4>
      <div className="grid grid-cols-2 gap-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-left p-2 bg-green-900/20 rounded-lg border border-green-700/30 hover:bg-green-800/30 transition-colors text-sm text-green-200"
          >
            "{suggestion}"
          </button>
        ))}
      </div>
    </div>
  );
};
