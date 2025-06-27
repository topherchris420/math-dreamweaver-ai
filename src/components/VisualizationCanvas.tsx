
import { Button } from '@/components/ui/button';
import { MathDomain } from '@/pages/Index';

interface VisualizationCanvasProps {
  domain: MathDomain;
  activeVisualization: string;
  isGenerating: boolean;
}

export const VisualizationCanvas = ({ domain, activeVisualization, isGenerating }: VisualizationCanvasProps) => {
  if (!activeVisualization) {
    return (
      <div className="bg-slate-900/30 rounded-lg border-2 border-dashed border-blue-700/30 h-96 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="text-4xl text-blue-400">◊</div>
          <p className="text-blue-400">Select a visualization type to begin</p>
          <p className="text-sm text-gray-500">Interactive mathematical visualizations will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black rounded-lg p-6 border border-blue-700/30 relative overflow-hidden">
      {/* Simulated mathematical visualization */}
      <div className="w-full h-80 relative bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 rounded-lg flex items-center justify-center">
        {isGenerating ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin mx-auto"></div>
            <p className="text-blue-300">Generating mathematical visualization...</p>
          </div>
        ) : (
          <div className="text-center space-y-4">
            {/* Mathematical visualization placeholder */}
            <div className="relative">
              {domain === 'topology' && (
                <div className="w-64 h-48 border-2 border-blue-400 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-blue-300 text-lg">∂M = ∅</div>
                </div>
              )}
              {domain === 'number-theory' && (
                <div className="w-64 h-48 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className="absolute w-2 h-2 bg-green-400 rounded-full animate-pulse" 
                           style={{
                             left: `${Math.random() * 100}%`,
                             top: `${Math.random() * 100}%`,
                             animationDelay: `${i * 0.1}s`
                           }}></div>
                    ))}
                  </div>
                  <div className="text-green-300 text-lg z-10">ζ(s) = Σn⁻ˢ</div>
                </div>
              )}
              {domain === 'combinatorics' && (
                <div className="w-64 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <svg width="200" height="150" className="text-purple-300">
                    {/* Simple graph visualization */}
                    <circle cx="50" cy="50" r="8" fill="currentColor" />
                    <circle cx="150" cy="50" r="8" fill="currentColor" />
                    <circle cx="100" cy="100" r="8" fill="currentColor" />
                    <circle cx="50" cy="130" r="8" fill="currentColor" />
                    <circle cx="150" cy="130" r="8" fill="currentColor" />
                    <line x1="50" y1="50" x2="150" y2="50" stroke="currentColor" strokeWidth="2" />
                    <line x1="50" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
                    <line x1="150" y1="50" x2="100" y2="100" stroke="currentColor" strokeWidth="2" />
                    <line x1="100" y1="100" x2="50" y2="130" stroke="currentColor" strokeWidth="2" />
                    <line x1="100" y1="100" x2="150" y2="130" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
              {domain === 'algebraic-geometry' && (
                <div className="w-64 h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-orange-300 text-lg">V(f) ⊂ ℂⁿ</div>
                </div>
              )}
              {domain === 'analysis' && (
                <div className="w-64 h-48 bg-gradient-to-br from-indigo-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-indigo-300 text-lg">∫ f(z) dz</div>
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-400">
              Interactive {domain} visualization - {activeVisualization}
            </div>
          </div>
        )}
      </div>

      {/* Visualization Controls */}
      {!isGenerating && activeVisualization && (
        <div className="mt-4 flex justify-center space-x-2">
          <Button size="sm" variant="outline" className="text-xs border-blue-600/50 text-blue-300">
            Rotate
          </Button>
          <Button size="sm" variant="outline" className="text-xs border-blue-600/50 text-blue-300">
            Zoom
          </Button>
          <Button size="sm" variant="outline" className="text-xs border-blue-600/50 text-blue-300">
            Parameters
          </Button>
          <Button size="sm" variant="outline" className="text-xs border-blue-600/50 text-blue-300">
            Export
          </Button>
        </div>
      )}
    </div>
  );
};
