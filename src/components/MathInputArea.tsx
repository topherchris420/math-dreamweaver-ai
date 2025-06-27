
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MathDomain } from '@/pages/Index';

interface MathInputAreaProps {
  input: string;
  setInput: (input: string) => void;
  domain: MathDomain;
  isProcessing: boolean;
  onSubmit: (input: string) => void;
}

const domainPrompts = {
  'topology': 'Let\'s explore topological spaces and continuous mappings...',
  'number-theory': 'Consider the distribution of prime numbers and arithmetic functions...',
  'combinatorics': 'Investigate combinatorial structures and counting principles...',
  'algebraic-geometry': 'Examine algebraic varieties and geometric properties...',
  'analysis': 'Study analytic functions and convergence properties...'
};

export const MathInputArea = ({ input, setInput, domain, isProcessing, onSubmit }: MathInputAreaProps) => {
  return (
    <div className="space-y-3">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={domainPrompts[domain]}
        className="min-h-[100px] bg-slate-900/50 border-blue-700/30 text-white placeholder-blue-400/60"
      />
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-blue-400">
          Exploring: <span className="capitalize font-semibold">{domain.replace('-', ' ')}</span>
        </div>
        
        <Button
          onClick={() => onSubmit(input)}
          disabled={!input.trim() || isProcessing}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
        >
          {isProcessing ? (
            <span className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>AI Thinking...</span>
            </span>
          ) : (
            'Collaborate with AI'
          )}
        </Button>
      </div>
    </div>
  );
};
