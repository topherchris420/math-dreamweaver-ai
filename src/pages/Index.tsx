
import { useState, useEffect } from 'react';
import { Brain, Users, Infinity, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CosmologicalReflector } from '@/components/CosmologicalReflector';
import { MathWorkspace } from '@/components/MathWorkspace';
import { DomainSelector } from '@/components/DomainSelector';

export type MathDomain = 'topology' | 'number-theory' | 'combinatorics' | 'algebraic-geometry' | 'analysis';

const Index = () => {
  const [currentDomain, setCurrentDomain] = useState<MathDomain>('topology');
  const [activeMode, setActiveMode] = useState<'home' | 'think' | 'collaborate'>('home');
  const [discoverySession, setDiscoverySession] = useState({
    theorems: [],
    conjectures: [],
    patterns: [],
    proofSteps: []
  });

  // Enable dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (activeMode === 'think') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Header */}
        <header className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setActiveMode('home')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-light text-white">SYMMATRIA</h1>
            <div></div>
          </div>
        </header>

        {/* Think Mode Content */}
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-32 h-32 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-16 h-16 text-white" />
              </div>
              <h1 className="text-6xl font-thin text-white mb-6 tracking-wider">THINK</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                Autonomous AI contemplation on the nature of finite and infinite universes. 
                Pure contemplative exploration without interaction.
              </p>
              <div className="flex items-center justify-center mt-8 text-white/60">
                <Infinity className="w-6 h-6 mr-3" />
                <span className="text-lg font-light">Autonomous Contemplation</span>
              </div>
            </div>

            <CosmologicalReflector />
          </div>
        </div>
      </div>
    );
  }

  if (activeMode === 'collaborate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Header */}
        <header className="relative z-10 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setActiveMode('home')}
              className="text-white/80 hover:text-white hover:bg-white/10"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-light text-white">SYMMATRIA</h1>
            <div className="hidden md:block">
              <DomainSelector 
                currentDomain={currentDomain}
                onDomainChange={setCurrentDomain}
              />
            </div>
          </div>
        </header>

        {/* Collaborate Mode Content */}
        <div className="relative z-10 h-[calc(100vh-96px)]">
          <div className="container mx-auto px-6 h-full">
            <div className="text-center mb-8">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-thin text-white mb-4 tracking-wider">COLLABORATE</h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                AI-powered mathematical discovery through human-machine collaboration. 
                Explore novel structures, theorems, and conjectures.
              </p>
            </div>

            <div className="md:hidden mb-6">
              <DomainSelector 
                currentDomain={currentDomain}
                onDomainChange={setCurrentDomain}
              />
            </div>

            <MathWorkspace 
              domain={currentDomain}
              onDiscovery={(discovery) => {
                setDiscoverySession(prev => ({
                  ...prev,
                  ...discovery
                }));
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Home screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full floating"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/70 rounded-full floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-emerald-400/50 rounded-full floating" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-orange-400/60 rounded-full floating" style={{animationDelay: '6s'}}></div>
      </div>

      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <img
                  src="/lovable-uploads/21ab93f1-5c73-4d40-a193-6e958bcd969b.png"
                  alt="Symmatria"
                  className="w-16 h-16 rounded-full object-cover pulse-glow"
                />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-blue-400 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-7xl font-thin text-white mb-6 tracking-widest">
              SYMMATRIA
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              An immersive environment for mathematical exploration and AI-powered discovery
            </p>
          </div>

          {/* Main Sections */}
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Think Section */}
            <div 
              className="group cursor-pointer"
              onClick={() => setActiveMode('think')}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-500">
                  <Brain className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h2 className="text-4xl font-thin text-white mb-6 tracking-wider">THINK</h2>
                
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Autonomous AI contemplation on the nature of finite and infinite universes. 
                  Pure contemplative exploration without interaction.
                </p>
                
                <div className="flex items-center justify-center text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  <Infinity className="w-5 h-5 mr-3" />
                  <span className="text-sm font-light tracking-wide">Autonomous Contemplation</span>
                </div>
              </div>
            </div>

            {/* Collaborate Section */}
            <div 
              className="group cursor-pointer"
              onClick={() => setActiveMode('collaborate')}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 text-center hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-white/20">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-all duration-500">
                  <Users className="w-16 h-16 text-white group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <h2 className="text-4xl font-thin text-white mb-6 tracking-wider">COLLABORATE</h2>
                
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  AI-powered mathematical discovery through human-machine collaboration. 
                  Explore novel structures, theorems, and conjectures.
                </p>
                
                <div className="flex items-center justify-center text-white/50 group-hover:text-white/70 transition-colors duration-300">
                  <Sparkles className="w-5 h-5 mr-3" />
                  <span className="text-sm font-light tracking-wide">Interactive Discovery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16">
            <p className="text-white/40 text-sm font-light">
              Select a mode to begin your mathematical journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
