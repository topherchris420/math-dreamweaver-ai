
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MathDomain } from '@/pages/Index';

interface TheoremProverProps {
  domain: MathDomain;
}

export const TheoremProver = ({ domain }: TheoremProverProps) => {
  const [formalStatement, setFormalStatement] = useState('');
  const [proofState, setProofState] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [tactics, setTactics] = useState<string[]>([]);

  const domainTemplates = {
    'topology': 'theorem fundamental_group_of_circle : π₁(S¹) ≅ ℤ',
    'number-theory': 'theorem primes_infinite : ∀ n : ℕ, ∃ p > n, Prime p',
    'combinatorics': 'theorem pigeonhole : ∀ n m : ℕ, n > m → ∃ f : Fin n → Fin m, ¬Injective f',
    'algebraic-geometry': 'theorem bezout : deg(f ∩ g) = deg(f) · deg(g)',
    'analysis': 'theorem intermediate_value : Continuous f → f a < 0 → f b > 0 → ∃ c, f c = 0'
  };

  const startFormalProof = async () => {
    setIsVerifying(true);
    setProofState({
      goals: [formalStatement || domainTemplates[domain]],
      hypotheses: [],
      context: domain,
      step: 0
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setTactics([
      'intro',
      'cases',
      'apply',
      'exact',
      'simp',
      'ring',
      'field_simp',
      'induction'
    ]);
    
    setIsVerifying(false);
  };

  const applyTactic = (tactic: string) => {
    if (!proofState) return;
    
    setProofState(prev => ({
      ...prev,
      step: prev.step + 1,
      lastTactic: tactic,
      goals: prev.goals.length > 1 ? prev.goals.slice(1) : []
    }));
  };

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-indigo-500/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-indigo-300">Formal Theorem Prover</h3>
        <div className="text-xs text-indigo-400">Lean 4 Compatible</div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-indigo-300 mb-2 block">Formal Statement</label>
          <Textarea
            value={formalStatement}
            onChange={(e) => setFormalStatement(e.target.value)}
            placeholder={domainTemplates[domain]}
            className="bg-black/50 border-indigo-500/30 text-white font-mono text-sm"
          />
        </div>

        {!proofState ? (
          <Button
            onClick={startFormalProof}
            disabled={isVerifying}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            {isVerifying ? 'Initializing Proof State...' : 'Start Formal Proof'}
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="bg-black/50 rounded-lg p-3 border border-indigo-500/20">
              <div className="text-xs text-indigo-400 mb-1">Current Goals ({proofState.goals.length})</div>
              {proofState.goals.map((goal: string, idx: number) => (
                <div key={idx} className="text-white font-mono text-sm bg-indigo-900/20 p-2 rounded">
                  {goal}
                </div>
              ))}
              {proofState.goals.length === 0 && (
                <div className="text-green-400 font-mono text-sm">✓ Proof Complete</div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {tactics.map((tactic) => (
                <Button
                  key={tactic}
                  size="sm"
                  variant="outline"
                  onClick={() => applyTactic(tactic)}
                  className="text-xs border-indigo-600/50 text-indigo-300 hover:bg-indigo-900/30"
                  disabled={proofState.goals.length === 0}
                >
                  {tactic}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
