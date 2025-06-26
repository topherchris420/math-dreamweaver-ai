
import { useState } from 'react';
import { MathDomain } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface NaturalLanguageBuilderProps {
  domain: MathDomain;
}

export const NaturalLanguageBuilder = ({ domain }: NaturalLanguageBuilderProps) => {
  const [naturalInput, setNaturalInput] = useState('');
  const [generatedTheorem, setGeneratedTheorem] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [buildingSteps, setBuildingSteps] = useState<string[]>([]);

  const processNaturalLanguage = async () => {
    setIsProcessing(true);
    setBuildingSteps([]);
    
    const steps = [
      'Parsing natural language input...',
      'Identifying mathematical concepts...',
      'Mapping to formal structures...',
      'Generating theorem statement...',
      'Validating logical consistency...',
      'Constructing proof outline...'
    ];

    for (let i = 0; i < steps.length; i++) {
      setBuildingSteps(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Generate theorem based on natural language input
    const theorem = generateTheoremFromNL(naturalInput, domain);
    setGeneratedTheorem(theorem);
    setIsProcessing(false);
  };

  const generateTheoremFromNL = (input: string, domain: MathDomain) => {
    const theoremTemplates = {
      'topology': {
        title: 'Topological Characterization Theorem',
        statement: `For any compact connected topological space X satisfying the properties described in "${input}", there exists a homeomorphism φ: X → Y where Y has the desired structural properties.`,
        formalStatement: '∀X ∈ CompactConnected : P(X) ⟹ ∃φ: X ≅ Y ∧ Q(Y)',
        proofOutline: [
          'Establish compactness using sequential characterization',
          'Prove connectedness via contradiction',
          'Construct the desired homeomorphism φ',
          'Verify φ preserves topological properties'
        ]
      },
      'number-theory': {
        title: 'Arithmetic Function Theorem',
        statement: `Let f be the arithmetic function derived from "${input}". Then f exhibits multiplicative properties and satisfies the growth condition established by the Dirichlet series analysis.`,
        formalStatement: '∀n ∈ ℕ : f(mn) = f(m)f(n) ∧ gcd(m,n) = 1 ⟹ |f(n)| ≪ n^ε',
        proofOutline: [
          'Establish multiplicativity via Euler product',
          'Analyze Dirichlet series convergence',
          'Apply prime number theorem techniques',
          'Derive growth bound using analytic methods'
        ]
      },
      'combinatorics': {
        title: 'Combinatorial Structure Theorem',
        statement: `The combinatorial objects described in "${input}" admit a bijective correspondence with standard combinatorial families, preserving the specified counting properties.`,
        formalStatement: '∃ bijection φ: S → T such that |φ⁻¹(t)| = c(t) ∀t ∈ T',
        proofOutline: [
          'Define the bijection constructively',
          'Verify preservation of combinatorial properties',
          'Establish generating function equivalence',
          'Prove asymptotic growth matches expected behavior'
        ]
      },
      'algebraic-geometry': {
        title: 'Geometric Correspondence Theorem',
        statement: `The algebraic variety V defined by the geometric constraints in "${input}" has dimension d and admits a birational map to a smooth projective variety.`,
        formalStatement: 'dim(V) = d ∧ ∃ birational φ: V ⇢ W where W is smooth projective',
        proofOutline: [
          'Compute dimension using Krull dimension theory',
          'Resolve singularities via blowup construction', 
          'Construct birational map to projective space',
          'Verify smoothness of target variety'
        ]
      },
      'analysis': {
        title: 'Analytic Function Theorem',
        statement: `The function class described in "${input}" consists of analytic functions with prescribed growth properties and admits a complete characterization via functional analysis techniques.`,
        formalStatement: '∀f ∈ F : f analytic ∧ |f(z)| ≤ M|z|^α ⟹ f ∈ ℋ_α',
        proofOutline: [
          'Establish analyticity via Cauchy-Riemann equations',
          'Prove growth bound using maximum principle',
          'Apply Phragmén-Lindelöf theorem',
          'Characterize function space using Hilbert space theory'
        ]
      }
    };

    return theoremTemplates[domain] || theoremTemplates['topology'];
  };

  const examplePrompts = {
    'topology': [
      'Describe spaces that locally look like Euclidean space but globally have different properties',
      'Consider continuous maps that preserve connectivity but not compactness',
      'Explore fundamental groups of spaces obtained by gluing operations'
    ],
    'number-theory': [
      'Investigate primes that follow specific arithmetic progressions',
      'Study the distribution of quadratic residues modulo large primes',
      'Analyze multiplicative functions with special Euler product expansions'
    ],
    'combinatorics': [
      'Count lattice paths avoiding certain forbidden patterns',
      'Enumerate trees with prescribed degree sequences',
      'Study permutations with restricted cycle structures'
    ],
    'algebraic-geometry': [
      'Examine curves of genus 2 with special automorphism groups',
      'Investigate varieties defined by symmetric polynomial equations',
      'Study rational points on elliptic curves over finite fields'
    ],
    'analysis': [
      'Characterize functions holomorphic in punctured disks with prescribed singularities',
      'Study harmonic functions on domains with fractal boundaries',
      'Analyze convergence properties of Fourier series with special coefficients'
    ]
  };

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-blue-300">Natural Language Theorem Builder</h2>
        <div className="text-sm text-blue-400 capitalize flex items-center space-x-2">
          <span>℘</span>
          <span>{domain.replace('-', ' ')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
        {/* Input Section */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Describe Your Mathematical Idea</h3>
            <Textarea
              value={naturalInput}
              onChange={(e) => setNaturalInput(e.target.value)}
              placeholder={`Describe a mathematical concept in ${domain.replace('-', ' ')} using natural language. For example: "Consider all continuous functions that map compact sets to connected sets while preserving certain topological properties..."`}
              className="min-h-[120px] bg-slate-900/50 border-blue-700/30 text-white placeholder-blue-400/60"
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">Example Prompts for {domain.replace('-', ' ')}:</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {(examplePrompts[domain] || []).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setNaturalInput(prompt)}
                  className="w-full text-left p-3 bg-slate-900/30 rounded-lg border border-blue-700/20 hover:bg-slate-800/50 hover:border-blue-600/40 transition-colors text-sm text-blue-200"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={processNaturalLanguage}
            disabled={!naturalInput.trim() || isProcessing}
            className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white"
          >
            {isProcessing ? 'Building Theorem...' : 'Generate Formal Theorem'}
          </Button>

          {/* Processing Steps */}
          {isProcessing && (
            <Card className="bg-slate-900/50 border-green-700/30 p-4">
              <h4 className="text-sm font-semibold text-green-300 mb-3">AI Language Processing:</h4>
              <div className="space-y-2">
                {buildingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-200">{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Generated Theorem Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-300">Generated Formal Theorem</h3>
          
          {generatedTheorem ? (
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-700/30 p-4">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">{generatedTheorem.title}</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-semibold text-purple-400 mb-2">Natural Language Statement:</h5>
                    <p className="text-white text-sm bg-slate-900/50 p-3 rounded-lg leading-relaxed">
                      {generatedTheorem.statement}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-purple-400 mb-2">Formal Mathematical Statement:</h5>
                    <div className="bg-slate-900/50 p-3 rounded-lg">
                      <code className="text-purple-200 font-mono text-sm">{generatedTheorem.formalStatement}</code>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-semibold text-purple-400 mb-2">Proof Outline:</h5>
                    <ol className="space-y-1">
                      {generatedTheorem.proofOutline.map((step: string, idx: number) => (
                        <li key={idx} className="text-sm text-purple-200 flex items-start space-x-2">
                          <span className="text-purple-400 font-semibold">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-4 border-t border-purple-700/30">
                  <Button size="sm" variant="outline" className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30">
                    Refine Statement
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30">
                    Generate Proof
                  </Button>
                  <Button size="sm" variant="outline" className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30">
                    Export LaTeX
                  </Button>
                </div>
              </Card>
            </div>
          ) : (
            <div className="bg-slate-900/30 rounded-lg border-2 border-dashed border-blue-700/30 h-96 flex items-center justify-center">
              <div className="text-center space-y-3">
                <div className="text-4xl text-blue-400">℘</div>
                <p className="text-blue-400">Formal theorem will appear here</p>
                <p className="text-sm text-gray-500">Enter a mathematical description to generate a formal theorem statement</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
