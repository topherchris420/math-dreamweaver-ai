
import { useState, useEffect } from 'react';
import { HomePage } from '@/components/HomePage';
import { ThinkPage } from '@/components/ThinkPage';
import { CollaboratePage } from '@/components/CollaboratePage';

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

  const handleModeChange = (mode: 'think' | 'collaborate') => {
    setActiveMode(mode);
  };

  const handleBackToHome = () => {
    setActiveMode('home');
  };

  const handleDiscovery = (discovery: any) => {
    setDiscoverySession(prev => ({
      ...prev,
      ...discovery
    }));
  };

  if (activeMode === 'think') {
    return <ThinkPage onBack={handleBackToHome} />;
  }

  if (activeMode === 'collaborate') {
    return (
      <CollaboratePage
        onBack={handleBackToHome}
        currentDomain={currentDomain}
        onDomainChange={setCurrentDomain}
        onDiscovery={handleDiscovery}
      />
    );
  }

  return <HomePage onModeChange={handleModeChange} />;
};

export default Index;
