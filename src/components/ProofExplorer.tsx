
import { useState } from 'react';
import { MathDomain } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ProofExplorerProps {
  domain: MathDomain;
}

export const ProofExplorer = ({ domain }: ProofExplorerProps) => {
  const [currentProof, setCurrentProof] = useState<any>(null);
  const [proofSteps, setProofSteps] = useState<any[]>([]);
  const [isExploring, setIsExploring] = useState(false);

  const sampleProofStructure = {
    title: 'Interactive Proof Construction',
    steps: [
      {
        id: 1,
        type: 'assumption',
        statement: 'Let X be a topological space with the desired properties',
        justification: 'Starting assumption',
        confidence: 1.0
      },
      {
        id: 2,
        type: 'lemma',
        statement: 'The fundamental group π₁(X) is finitely generated',
        justification: 'By compactness and local properties',
        confidence: 0.95
      },
      {
        id: 3,
        type: 'construction',
        statement: 'Consider the universal cover X̃ → X',
        justification: 'Standard covering space theory',
        confidence: 0.98
      },
      {
        id: 4,
        type: 'conclusion',
        statement: 'Therefore, X has the required homotopy property',
        justification: 'Following from steps 1-3',
        confidence: 0.87
      }
    ]
  };

  const startProofExploration = () => {
    setIsExploring(true);
    setCurrentProof(sampleProofStructure);
    setProofSteps(sampleProofStructure.steps);
    setTimeout(() => setIsExploring(false), 1500);
  };

  const getStepColor = (type: string) => {
    const colors = {
      assumption: 'from-blue-500 to-cyan-500',
      lemma: 'from-green-500 to-teal-500',
      construction: 'from-purple-500 to-pink-500',
      conclusion: 'from-orange-500 to-red-500'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-slate-500';
  };

  const getStepIcon = (type: string) => {
    const icons = {
      assumption: '⊢',
      lemma: '∴',
      construction: '⚡',
      conclusion: '∎'
    };
    return icons[type as keyof typeof icons] || '•';
  };

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-blue-300">Interactive Proof Explorer</h2>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-blue-400">
            Domain: <span className="capitalize font-semibold">{domain.replace('-', ' ')}</span>
          </div>
          <Button
            onClick={startProofExploration}
            disabled={isExploring}
            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white"
          >
            {isExploring ? 'Constructing...' : 'New Proof'}
          </Button>
        </div>
      </div>

      {!currentProof ? (
        <div className="flex items-center justify-center h-96 text-center">
          <div className="space-y-4">
            <div className="text-6xl text-blue-400">⊢</div>
            <h3 className="text-xl font-semibold text-blue-300">AI-Assisted Proof Construction</h3>
            <p className="text-blue-400 max-w-md">
              Collaborate with AI to build rigorous mathematical proofs step by step. 
              Explore different proof strategies and validate logical connections.
            </p>
            <Button
              onClick={startProofExploration}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Begin Proof Exploration
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Proof Header */}
          <Card className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border-indigo-700/30 p-4">
            <h3 className="text-lg font-semibold text-indigo-300 mb-2">{currentProof.title}</h3>
            <div className="flex items-center space-x-4 text-sm text-indigo-400">
              <span>Steps: {proofSteps.length}</span>
              <span>•</span>
              <span>Confidence: {Math.round(proofSteps.reduce((acc, step) => acc + step.confidence, 0) / proofSteps.length * 100)}%</span>
              <span>•</span>
              <span className="capitalize">{domain.replace('-', ' ')}</span>
            </div>
          </Card>

          {/* Proof Steps */}
          <div className="space-y-4">
            {proofSteps.map((step, index) => (
              <Card key={step.id} className="relative overflow-hidden">
                {/* Step Number and Type Indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getStepColor(step.type)}`}></div>
                
                <div className="p-4 pl-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${getStepColor(step.type)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                        {getStepIcon(step.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white capitalize">{step.type}</h4>
                        <div className="text-sm text-gray-400">Step {index + 1}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-400">
                        {Math.round(step.confidence * 100)}%
                      </div>
                      <div className={`w-2 h-2 rounded-full ${step.confidence > 0.9 ? 'bg-green-400' : step.confidence > 0.8 ? 'bg-yellow-400' : 'bg-orange-400'}`}></div>
                    </div>
                  </div>

                  <div className="bg-slate-900/30 rounded-lg p-4 mb-3">
                    <p className="text-white font-mono text-sm">{step.statement}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Justification: {step.justification}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs border-blue-600/50 text-blue-300">
                        Expand
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs border-blue-600/50 text-blue-300">
                        Verify
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Proof Actions */}
          <div className="flex justify-center space-x-4 pt-4 border-t border-blue-700/30">
            <Button variant="outline" className="border-green-600/50 text-green-300 hover:bg-green-900/30">
              Add Step
            </Button>
            <Button variant="outline" className="border-yellow-600/50 text-yellow-300 hover:bg-yellow-900/30">
              Alternative Path
            </Button>
            <Button variant="outline" className="border-purple-600/50 text-purple-300 hover:bg-purple-900/30">
              Validate Proof
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
