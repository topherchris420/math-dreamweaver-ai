
import { useState, useEffect } from 'react';
import { MathWorkspace } from '@/components/MathWorkspace';
import { DomainSelector } from '@/components/DomainSelector';
import { ConjecturePanel } from '@/components/ConjecturePanel';
import { ProofExplorer } from '@/components/ProofExplorer';
import { VisualizationEngine } from '@/components/VisualizationEngine';
import { NaturalLanguageBuilder } from '@/components/NaturalLanguageBuilder';
import { CollaborationHub } from '@/components/CollaborationHub';
import { PatternRecognition } from '@/components/PatternRecognition';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type MathDomain = 'topology' | 'number-theory' | 'combinatorics' | 'algebraic-geometry' | 'analysis';

const Index = () => {
  const [currentDomain, setCurrentDomain] = useState<MathDomain>('topology');
  const [activeView, setActiveView] = useState<'workspace' | 'proof' | 'visualization' | 'language'>('workspace');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [discoverySession, setDiscoverySession] = useState({
    theorems: [],
    conjectures: [],
    patterns: [],
    proofSteps: []
  });

  // Enable dark mode by default for the iOS black aesthetic
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-black font-inter relative overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full opacity-60 floating"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-500 rounded-full opacity-70 floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-50 floating" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-orange-500 rounded-full opacity-60 floating" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Header - iOS inspired with glass morphism */}
      <header className="sticky top-0 z-50 glass-morphism">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src="/lovable-uploads/21ab93f1-5c73-4d40-a193-6e958bcd969b.png"
                  alt="Symmatria"
                  className="w-8 h-8 rounded-lg object-cover pulse-glow"
                />
                <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-blue-400 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Symmatria
                </h1>
                <p className="text-xs text-gray-300">Mathematical Co-Author</p>
              </div>
            </div>
          </div>

          {/* Domain Selector - Desktop */}
          <div className="hidden md:block">
            <DomainSelector 
              currentDomain={currentDomain}
              onDomainChange={setCurrentDomain}
            />
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 glass-morphism
          transform transition-transform duration-300 ease-in-out lg:transform-none overflow-y-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-4 space-y-6">
            {/* Mobile Domain Selector */}
            <div className="lg:hidden">
              <DomainSelector 
                currentDomain={currentDomain}
                onDomainChange={setCurrentDomain}
              />
            </div>

            {/* Navigation */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide">
                Discovery Tools
              </h3>
              <div className="space-y-1">
                {[
                  { id: 'workspace', label: 'Symbolic Canvas', icon: '∇' },
                  { id: 'proof', label: 'Proof Atelier', icon: '⊢' },
                  { id: 'visualization', label: 'Visual Geometry', icon: '◊' },
                  { id: 'language', label: 'Theorem Poet', icon: '℘' }
                ].map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => {
                      setActiveView(tool.id as any);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeView === tool.id
                        ? 'bg-blue-600/30 text-blue-300 backdrop-blur-sm border border-blue-500/30 pulse-glow'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{tool.icon}</span>
                    <span>{tool.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <PatternRecognition domain={currentDomain} />
            <CollaborationHub />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          {/* Center Panel */}
          <div className="flex-1 relative bg-black/50 backdrop-blur-sm">
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

          {/* Right Panel - Desktop Only */}
          <aside className="hidden xl:block w-80 glass-morphism">
            <div className="p-4">
              <ConjecturePanel 
                domain={currentDomain}
                discoveries={discoverySession}
              />
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Index;
