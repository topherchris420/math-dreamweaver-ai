
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
      <header className="relative z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white/80 hover:text-white hover:bg-white/10 touch-manipulation min-h-[44px] px-3 sm:px-4"
          >
            ← Back
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-light text-white">SYMMATRIA</h1>
          <div className="w-[60px] sm:w-[80px]"></div>
        </div>
      </header>

      {/* Think Mode Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto mb-6 sm:mb-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Brain className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin text-white mb-4 sm:mb-6 tracking-wider">THINK</h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4">
              Autonomous AI contemplation on the nature of finite and infinite universes. 
              Pure contemplative exploration without interaction.
            </p>
            <div className="flex items-center justify-center mt-6 sm:mt-8 text-white/60">
              <Infinity className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              <span className="text-sm sm:text-base lg:text-lg font-light">Autonomous Contemplation</span>
            </div>
          </div>

          <CosmologicalReflector />
        </div>
      </div>
    </div>
  );
};
