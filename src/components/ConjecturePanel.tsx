
import { useState } from 'react';
import { MathDomain } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ConjecturePanelProps {
  domain: MathDomain;
  discoveries: any;
}

export const ConjecturePanel = ({ domain, discoveries }: ConjecturePanelProps) => {
  const [activeTab, setActiveTab] = useState<'conjectures' | 'theorems' | 'patterns'>('conjectures');

  const sampleConjectures = {
    'topology': [
      {
        id: 1,
        title: 'Generalized Homotopy Conjecture',
        statement: 'For any finite CW-complex X, the homotopy groups π_n(X) exhibit periodic behavior in the stable range.',
        confidence: 0.78,
        evidence: ['Computational verification for n ≤ 12', 'Pattern matching with known cases']
      }
    ],
    'number-theory': [
      {
        id: 1,
        title: 'Extended Goldbach Variant',
        statement: 'Every even integer greater than 4 can be expressed as the sum of two primes plus a perfect square.',
        confidence: 0.85,
        evidence: ['Verified for all even numbers up to 10^8', 'Probabilistic argument via Hardy-Littlewood']
      }
    ],
    'combinatorics': [
      {
        id: 1,
        title: 'Graph Coloring Optimization',
        statement: 'For planar graphs with maximum degree Δ, chromatic number ≤ max(4, ⌊Δ/2⌋ + 2).',
        confidence: 0.72,
        evidence: ['Computer-assisted proof for small cases', 'Structural analysis of planar embeddings']
      }
    ],
    'algebraic-geometry': [
      {
        id: 1,
        title: 'Variety Dimension Bound',
        statement: 'For smooth projective varieties over ℂ, the Kodaira dimension bounds the geometric genus.',
        confidence: 0.91,
        evidence: ['Cohomological calculations', 'Mirror symmetry predictions']
      }
    ],
    'analysis': [
      {
        id: 1,
        title: 'Harmonic Function Extension',
        statement: 'Harmonic functions on fractal boundaries extend uniquely to the interior with minimal energy.',
        confidence: 0.68,
        evidence: ['Variational principle verification', 'Numerical approximations']
      }
    ]
  };

  const currentConjectures = sampleConjectures[domain] || [];

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-blue-300">Mathematical Discoveries</h3>
        <div className="flex items-center space-x-1 text-xs">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-yellow-400">Live Analysis</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-slate-900/50 rounded-lg p-1">
        {[
          { id: 'conjectures', label: 'Conjectures', icon: '?' },
          { id: 'theorems', label: 'Theorems', icon: '∀' },
          { id: 'patterns', label: 'Patterns', icon: '∞' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-xs transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600/50 text-white'
                : 'text-blue-300 hover:bg-slate-700/50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activeTab === 'conjectures' && (
          <div className="space-y-3">
            {currentConjectures.map((conjecture) => (
              <Card key={conjecture.id} className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-700/30 p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="text-sm font-semibold text-yellow-300">{conjecture.title}</h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-xs text-yellow-400">{Math.round(conjecture.confidence * 100)}%</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-white leading-relaxed bg-slate-900/30 p-3 rounded-lg">
                    {conjecture.statement}
                  </p>
                  
                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-yellow-400">Supporting Evidence:</h5>
                    <ul className="space-y-1">
                      {conjecture.evidence.map((evidence, idx) => (
                        <li key={idx} className="text-xs text-yellow-200 flex items-start space-x-2">
                          <span className="text-yellow-400 mt-0.5">•</span>
                          <span>{evidence}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-2 pt-2 border-t border-yellow-700/30">
                    <Button size="sm" variant="outline" className="text-xs border-yellow-600/50 text-yellow-300 hover:bg-yellow-900/30">
                      Explore
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs border-yellow-600/50 text-yellow-300 hover:bg-yellow-900/30">
                      Verify
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'theorems' && (
          <div className="text-center py-8 text-blue-400">
            <div className="text-4xl mb-2">∀</div>
            <p className="text-sm">Proven theorems will appear here as discoveries are verified</p>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-3">
            <Card className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border-green-700/30 p-4">
              <h4 className="text-sm font-semibold text-green-300 mb-2">Recurring Structure</h4>
              <p className="text-xs text-white mb-2">Fibonacci-like sequences appearing in {domain} constructions</p>
              <div className="text-xs text-green-400">Confidence: 89%</div>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-700/30 p-4">
              <h4 className="text-sm font-semibold text-purple-300 mb-2">Symmetry Pattern</h4>
              <p className="text-xs text-white mb-2">Hidden symmetries in high-dimensional embeddings</p>
              <div className="text-xs text-purple-400">Confidence: 76%</div>
            </Card>
          </div>
        )}
      </div>

      {/* Discovery Stats */}
      <div className="mt-4 pt-4 border-t border-blue-700/30">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-yellow-400">3</div>
            <div className="text-xs text-yellow-300">Conjectures</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">1</div>
            <div className="text-xs text-green-300">Theorems</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">7</div>
            <div className="text-xs text-purple-300">Patterns</div>
          </div>
        </div>
      </div>
    </div>
  );
};
