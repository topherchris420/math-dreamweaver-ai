
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MathWorkspace } from '@/components/MathWorkspace';
import { DomainSelector } from '@/components/DomainSelector';
import { MathDomain } from '@/pages/Index';

interface CollaboratePageProps {
  onBack: () => void;
  currentDomain: MathDomain;
  onDomainChange: (domain: MathDomain) => void;
  onDiscovery: (discovery: any) => void;
}

export const CollaboratePage = ({ 
  onBack, 
  currentDomain, 
  onDomainChange, 
  onDiscovery 
}: CollaboratePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 relative">
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white/80 hover:text-white hover:bg-white/10"
          >
            ← Back
          </Button>
          <h1 className="text-2xl font-light text-white">SYMMATRIA</h1>
          <div className="hidden md:block">
            <DomainSelector 
              currentDomain={currentDomain}
              onDomainChange={onDomainChange}
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
              onDomainChange={onDomainChange}
            />
          </div>

          <MathWorkspace 
            domain={currentDomain}
            onDiscovery={onDiscovery}
          />
        </div>
      </div>
    </div>
  );
};
