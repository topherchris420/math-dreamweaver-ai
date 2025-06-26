
import { useState } from 'react';
import { MathWorkspace } from '@/components/MathWorkspace';
import { DomainSelector } from '@/components/DomainSelector';
import { ConjecturePanel } from '@/components/ConjecturePanel';
import { ProofExplorer } from '@/components/ProofExplorer';
import { VisualizationEngine } from '@/components/VisualizationEngine';
import { NaturalLanguageBuilder } from '@/components/NaturalLanguageBuilder';
import { CollaborationHub } from '@/components/CollaborationHub';
import { PatternRecognition } from '@/components/PatternRecognition';

export type MathDomain = 'topology' | 'number-theory' | 'combinatorics' | 'algebraic-geometry' | 'analysis';

const Index = () => {
  const [currentDomain, setCurrentDomain] = useState<MathDomain>('topology');
  const [activeView, setActiveView] = useState<'workspace' | 'proof' | 'visualization' | 'language'>('workspace');
  const [discoverySession, setDiscoverySession] = useState({
    theorems: [],
    conjectures: [],
    patterns: [],
    proofSteps: []
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Header with Domain Navigation */}
      <header className="border-b border-blue-800/30 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">∞</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                  MathAI Collaborator
                </h1>
              </div>
              <span className="text-sm text-blue-300 bg-blue-900/30 px-3 py-1 rounded-full">
                DARPA expMath Vision
              </span>
            </div>
            
            <DomainSelector 
              currentDomain={currentDomain}
              onDomainChange={setCurrentDomain}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
          {/* Left Sidebar - Tools and Controls */}
          <div className="col-span-3 space-y-4">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-blue-700/30 p-4">
              <h3 className="text-lg font-semibold mb-3 text-blue-300">Discovery Tools</h3>
              <div className="space-y-2">
                {[
                  { id: 'workspace', label: 'Math Workspace', icon: '∇' },
                  { id: 'proof', label: 'Proof Explorer', icon: '⊢' },
                  { id: 'visualization', label: 'Visual Engine', icon: '◊' },
                  { id: 'language', label: 'NL Builder', icon: '℘' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveView(tool.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all ${
                      activeView === tool.id
                        ? 'bg-blue-600/50 text-white border border-blue-500/50'
                        : 'text-blue-200 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span className="text-sm">{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <PatternRecognition domain={currentDomain} />
            <CollaborationHub />
          </div>

          {/* Main Content Area */}
          <div className="col-span-6">
            {activeView === 'workspace' && (
              <MathWorkspace 
                domain={currentDomain}
                onDiscovery={(discovery) => {
                  setDiscoverySession(prev => ({
                    ...prev,
                    ...discovery
                  }));
                }}
              />
            )}
            {activeView === 'proof' && (
              <ProofExplorer domain={currentDomain} />
            )}
            {activeView === 'visualization' && (
              <VisualizationEngine domain={currentDomain} />
            )}
            {activeView === 'language' && (
              <NaturalLanguageBuilder domain={currentDomain} />
            )}
          </div>

          {/* Right Sidebar - Conjectures and Insights */}
          <div className="col-span-3">
            <ConjecturePanel 
              domain={currentDomain}
              discoveries={discoverySession}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
