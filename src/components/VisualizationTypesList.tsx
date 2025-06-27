
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MathDomain } from '@/pages/Index';

interface VisualizationTypesListProps {
  domain: MathDomain;
  onGenerate: (vizType: string) => void;
}

const visualizationTypes = {
  'topology': [
    { id: 'manifold', name: 'Manifold Visualization', description: 'Interactive 3D manifold with topology markers' },
    { id: 'homotopy', name: 'Homotopy Animation', description: 'Continuous deformation of topological spaces' },
    { id: 'covering', name: 'Covering Spaces', description: 'Universal cover and fundamental group visualization' }
  ],
  'number-theory': [
    { id: 'prime-spiral', name: 'Prime Number Spiral', description: 'Ulam spiral revealing prime distribution patterns' },
    { id: 'modular-forms', name: 'Modular Forms', description: 'Complex plane visualization of modular transformations' },
    { id: 'l-functions', name: 'L-Function Zeros', description: 'Critical line and zero distribution analysis' }
  ],
  'combinatorics': [
    { id: 'graph-embedding', name: 'Graph Embeddings', description: 'High-dimensional graph structure in 2D/3D space' },
    { id: 'partition-function', name: 'Partition Diagrams', description: 'Young tableaux and partition visualization' },
    { id: 'generating-functions', name: 'Generating Functions', description: 'Coefficient growth and asymptotic behavior' }
  ],
  'algebraic-geometry': [
    { id: 'variety-plot', name: 'Algebraic Varieties', description: 'Real projections of complex algebraic varieties' },
    { id: 'cohomology', name: 'Cohomology Groups', description: 'Sheaf cohomology and geometric structures' },
    { id: 'mirror-symmetry', name: 'Mirror Symmetry', description: 'Calabi-Yau manifolds and mirror pairs' }
  ],
  'analysis': [
    { id: 'complex-function', name: 'Complex Functions', description: 'Domain coloring of complex analytic functions' },
    { id: 'fourier-transform', name: 'Fourier Analysis', description: 'Time-frequency decomposition visualization' },
    { id: 'fractal-analysis', name: 'Fractal Geometry', description: 'Self-similar structures and dimension analysis' }
  ]
};

export const VisualizationTypesList = ({ domain, onGenerate }: VisualizationTypesListProps) => {
  const currentVisualizations = visualizationTypes[domain] || [];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-blue-300">Available Visualizations</h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {currentVisualizations.map((viz) => (
          <Card key={viz.id} className="bg-slate-900/50 border-blue-700/30 p-4 hover:bg-slate-800/50 transition-colors cursor-pointer"
                onClick={() => onGenerate(viz.id)}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">{viz.name}</h4>
                <p className="text-sm text-gray-400">{viz.description}</p>
              </div>
              <Button 
                size="sm" 
                className="ml-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerate(viz.id);
                }}
              >
                Generate
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
