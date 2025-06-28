
import { useState } from 'react';
import { MathDomain } from '@/pages/Index';
import { VisualizationTypesList } from '@/components/VisualizationTypesList';
import { VisualizationCanvas } from '@/components/VisualizationCanvas';

interface VisualizationEngineProps {
  domain: MathDomain;
}

export const VisualizationEngine = ({ domain }: VisualizationEngineProps) => {
  const [activeVisualization, setActiveVisualization] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateVisualization = async (vizType: string) => {
    setIsGenerating(true);
    setActiveVisualization(vizType);
    
    // Simulate visualization generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
  };

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-blue-300">Mathematical Visualization Engine</h2>
        <div className="text-xs sm:text-sm text-blue-400 capitalize">
          {domain.replace('-', ' ')} Domain
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 h-full">
        {/* Visualization Types */}
        <VisualizationTypesList 
          domain={domain}
          onGenerate={generateVisualization}
        />

        {/* Visualization Canvas */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-blue-300">Visualization Canvas</h3>
          <VisualizationCanvas 
            domain={domain}
            activeVisualization={activeVisualization}
            isGenerating={isGenerating}
          />
        </div>
      </div>
    </div>
  );
};
