
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-violet-900 text-white">
      {/* Animated Mathematical Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-pulse">∫</div>
        <div className="absolute top-32 right-20 text-4xl animate-bounce" style={{animationDelay: '1s'}}>∇</div>
        <div className="absolute bottom-20 left-32 text-5xl animate-pulse" style={{animationDelay: '2s'}}>∞</div>
        <div className="absolute bottom-40 right-10 text-3xl animate-bounce" style={{animationDelay: '3s'}}>∑</div>
        <div className="absolute top-1/2 left-1/4 text-4xl animate-pulse" style={{animationDelay: '4s'}}>∂</div>
      </div>

      {/* Header with Enhanced Branding */}
      <header className="border-b border-violet-800/30 bg-slate-900/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  <span className="text-white font-bold text-lg relative z-10">Σ</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-300 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Symmatria
                  </h1>
                  <p className="text-sm text-violet-300/80 italic">Mathematical Co-Author</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-violet-300 bg-violet-900/30 px-4 py-2 rounded-full border border-violet-700/30">
                  Pure Mathematics Atelier
                </span>
                <span className="text-xs text-indigo-300 bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-700/30">
                  DARPA expMath Vision
                </span>
              </div>
            </div>
            
            <DomainSelector 
              currentDomain={currentDomain}
              onDomainChange={setCurrentDomain}
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8 h-[calc(100vh-140px)]">
          {/* Left Sidebar - Enhanced Discovery Tools */}
          <div className="col-span-3 space-y-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-violet-700/30 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <h3 className="text-xl font-semibold mb-4 text-violet-300 relative z-10">Discovery Instruments</h3>
              <div className="space-y-3 relative z-10">
                {[
                  { id: 'workspace', label: 'Symbolic Canvas', icon: '∇', desc: 'Interactive reasoning' },
                  { id: 'proof', label: 'Proof Atelier', icon: '⊢', desc: 'Collaborative proofs' },
                  { id: 'visualization', label: 'Visual Geometry', icon: '◊', desc: 'Mathematical art' },
                  { id: 'language', label: 'Theorem Poet', icon: '℘', desc: 'Natural language' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveView(tool.id as any)}
                    className={`w-full group relative overflow-hidden rounded-xl transition-all duration-300 ${
                      activeView === tool.id
                        ? 'bg-gradient-to-r from-violet-600/50 to-purple-600/50 text-white border border-violet-500/50 shadow-lg shadow-violet-500/20'
                        : 'bg-slate-800/30 text-violet-200 hover:bg-slate-700/40 hover:text-white border border-transparent hover:border-violet-700/30'
                    }`}
                  >
                    <div className="flex items-center space-x-4 p-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                        activeView === tool.id ? 'bg-white/20' : 'bg-violet-900/30 group-hover:bg-violet-800/50'
                      }`}>
                        <span className="text-xl">{tool.icon}</span>
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-medium">{tool.label}</div>
                        <div className="text-xs opacity-70">{tool.desc}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <PatternRecognition domain={currentDomain} />
            <CollaborationHub />
          </div>

          {/* Main Content Area - Enhanced Visual Design */}
          <div className="col-span-6 relative">
            <div className="h-full bg-slate-800/20 backdrop-blur-sm rounded-2xl border border-violet-700/20 overflow-hidden relative">
              {/* Subtle mathematical pattern overlay */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  <defs>
                    <pattern id="mathGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mathGrid)" />
                </svg>
              </div>
              
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
          </div>

          {/* Right Sidebar - Enhanced Conjectures Panel */}
          <div className="col-span-3">
            <ConjecturePanel 
              domain={currentDomain}
              discoveries={discoverySession}
            />
          </div>
        </div>
      </div>

      {/* Floating Mathematical Elements */}
      <div className="fixed bottom-6 right-6 opacity-20 pointer-events-none">
        <div className="text-2xl animate-pulse">∂/∂t</div>
      </div>
    </div>
  );
};

export default Index;
