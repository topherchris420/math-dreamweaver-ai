
import { useState } from 'react';
import { MathWorkspace } from '@/components/MathWorkspace';
import { DomainSelector } from '@/components/DomainSelector';
import { ConjecturePanel } from '@/components/ConjecturePanel';
import { ProofExplorer } from '@/components/ProofExplorer';
import { VisualizationEngine } from '@/components/VisualizationEngine';
import { NaturalLanguageBuilder } from '@/components/NaturalLanguageBuilder';
import { CollaborationHub } from '@/components/CollaborationHub';
import { PatternRecognition } from '@/components/PatternRecognition';
import { Menu, X } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-inter">
      {/* Header - Gemini-inspired */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 lg:px-6 h-16">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/21ab93f1-5c73-4d40-a193-6e958bcd969b.png"
                alt="Symmatria"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Symmatria
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Mathematical Co-Author</p>
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
            className="fixed inset-0 z-40 lg:hidden bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          transform transition-transform duration-200 ease-in-out lg:transform-none overflow-y-auto
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
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
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
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeView === tool.id
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
          <div className="flex-1 relative bg-white dark:bg-gray-950">
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
          <aside className="hidden xl:block w-80 border-l border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
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
