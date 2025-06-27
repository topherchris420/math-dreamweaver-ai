
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MathDomain } from '@/pages/Index';

interface SymbolicEngineProps {
  domain: MathDomain;
}

export const SymbolicEngine = ({ domain }: SymbolicEngineProps) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isComputing, setIsComputing] = useState(false);
  const [history, setHistory] = useState<Array<{input: string, output: string, operation: string}>>([]);

  const domainExamples = {
    'topology': '∫_γ ω = ∮_∂D ω',
    'number-theory': 'ζ(s) = ∑_{n=1}^∞ n^{-s}',
    'combinatorics': 'C(n,k) = n!/(k!(n-k)!)',
    'algebraic-geometry': 'dim(V ∩ W) = dim(V) + dim(W) - dim(V + W)',
    'analysis': 'lim_{x→a} f(x) = L'
  };

  const operations = [
    { id: 'simplify', label: 'Simplify', icon: '⟹' },
    { id: 'expand', label: 'Expand', icon: '⊕' },
    { id: 'factor', label: 'Factor', icon: '∏' },
    { id: 'solve', label: 'Solve', icon: '≡' },
    { id: 'differentiate', label: 'd/dx', icon: '∂' },
    { id: 'integrate', label: '∫', icon: '∫' }
  ];

  const performOperation = async (operation: string) => {
    if (!expression.trim()) return;
    
    setIsComputing(true);
    
    // Simulate symbolic computation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResults = {
      'simplify': `Simplified: ${expression}`,
      'expand': `Expanded: ${expression}`,
      'factor': `Factored: ${expression}`,
      'solve': `Solutions: x = {...}`,
      'differentiate': `d/dx(${expression}) = ...`,
      'integrate': `∫(${expression})dx = ... + C`
    };
    
    const output = mockResults[operation as keyof typeof mockResults] || `Result: ${expression}`;
    
    setResult({
      operation,
      input: expression,
      output,
      steps: [
        'Step 1: Parse expression',
        'Step 2: Apply transformation rules',
        'Step 3: Simplify result'
      ]
    });
    
    setHistory(prev => [...prev, { input: expression, output, operation }]);
    setIsComputing(false);
  };

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-cyan-500/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-cyan-300">Symbolic Mathematics</h3>
        <div className="text-xs text-cyan-400">Computer Algebra System</div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-cyan-300 mb-2 block">Mathematical Expression</label>
          <Textarea
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder={domainExamples[domain]}
            className="bg-black/50 border-cyan-500/30 text-white font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {operations.map((op) => (
            <Button
              key={op.id}
              size="sm"
              variant="outline"
              onClick={() => performOperation(op.id)}
              disabled={isComputing || !expression.trim()}
              className="text-xs border-cyan-600/50 text-cyan-300 hover:bg-cyan-900/30"
            >
              <span className="mr-1">{op.icon}</span>
              {op.label}
            </Button>
          ))}
        </div>

        {isComputing && (
          <div className="text-center py-4">
            <div className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-cyan-400 text-sm">Computing...</p>
          </div>
        )}

        {result && !isComputing && (
          <div className="bg-black/50 rounded-lg p-3 border border-cyan-500/20">
            <div className="text-xs text-cyan-400 mb-2 capitalize">{result.operation} Result</div>
            <div className="text-white font-mono text-sm mb-3 bg-cyan-900/20 p-2 rounded">
              {result.output}
            </div>
            <div className="text-xs text-cyan-300">
              <div className="font-semibold mb-1">Steps:</div>
              {result.steps.map((step: string, idx: number) => (
                <div key={idx} className="text-cyan-200">• {step}</div>
              ))}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="border-t border-cyan-500/20 pt-3">
            <div className="text-xs text-cyan-400 mb-2">Recent Computations</div>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {history.slice(-3).map((item, idx) => (
                <div key={idx} className="text-xs text-cyan-200 bg-cyan-900/10 p-2 rounded">
                  <span className="font-mono">{item.input}</span> → <span className="text-cyan-300">{item.operation}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
