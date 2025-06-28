
import { Brain, Infinity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CosmologicalReflector } from '@/components/CosmologicalReflector';

interface ThinkPageProps {
  onBack: () => void;
}

export const ThinkPage = ({ onBack }: ThinkPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
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
};
