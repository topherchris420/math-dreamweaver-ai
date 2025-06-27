
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LaTeXRendererProps {
  initialContent?: string;
  onExport?: (content: string) => void;
}

export const LaTeXRenderer = ({ initialContent = '', onExport }: LaTeXRendererProps) => {
  const [latex, setLatex] = useState(initialContent);
  const [isRendering, setIsRendering] = useState(false);

  const sampleTemplates = [
    {
      name: 'Theorem',
      content: '\\begin{theorem}\n  Let $G$ be a finite group of order $p$ where $p$ is prime. Then $G$ is cyclic.\n\\end{theorem}\n\n\\begin{proof}\n  Since $|G| = p$ is prime, by Lagrange\'s theorem...\n\\end{proof}'
    },
    {
      name: 'Definition',
      content: '\\begin{definition}\n  A topological space $X$ is called \\emph{compact} if every open cover of $X$ has a finite subcover.\n\\end{definition}'
    },
    {
      name: 'Equation',
      content: '\\begin{align}\n  \\int_{-\\infty}^{\\infty} e^{-x^2} dx &= \\sqrt{\\pi} \\\\\n  \\sum_{n=1}^{\\infty} \\frac{1}{n^2} &= \\frac{\\pi^2}{6}\n\\end{align}'
    }
  ];

  const insertTemplate = (template: string) => {
    setLatex(prev => prev + '\n\n' + template);
  };

  const simulateRender = async () => {
    setIsRendering(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRendering(false);
  };

  const exportContent = () => {
    if (onExport) {
      onExport(latex);
    } else {
      // Create downloadable LaTeX file
      const blob = new Blob([latex], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'theorem.tex';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-orange-500/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-orange-300">LaTeX Mathematical Typesetting</h3>
        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={simulateRender}
            disabled={isRendering}
            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs"
          >
            {isRendering ? 'Rendering...' : 'Render'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={exportContent}
            className="text-xs border-orange-600/50 text-orange-300"
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm text-orange-300 mb-2 block">LaTeX Source</label>
            <Textarea
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              placeholder="Enter LaTeX mathematical content..."
              className="bg-black/50 border-orange-500/30 text-white font-mono text-sm min-h-[300px]"
            />
          </div>
          
          <div>
            <div className="text-sm text-orange-300 mb-2">Quick Templates</div>
            <div className="flex flex-wrap gap-2">
              {sampleTemplates.map((template) => (
                <Button
                  key={template.name}
                  size="sm"
                  variant="outline"
                  onClick={() => insertTemplate(template.content)}
                  className="text-xs border-orange-600/50 text-orange-300 hover:bg-orange-900/30"
                >
                  {template.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-orange-300">Rendered Output</div>
          <div className="bg-white rounded-lg p-4 min-h-[300px] border border-orange-500/20">
            {isRendering ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-orange-400/30 border-t-orange-400 rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-orange-600 text-sm">Rendering LaTeX...</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-800 font-serif leading-relaxed">
                {latex ? (
                  <div className="space-y-4">
                    <div className="text-lg font-bold">Mathematical Document</div>
                    <div className="whitespace-pre-wrap font-mono text-sm bg-gray-50 p-3 rounded border">
                      {latex}
                    </div>
                    <div className="text-sm text-gray-600 italic">
                      * This is a preview. In a full implementation, this would render actual LaTeX mathematics.
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-500 text-center py-12">
                    Enter LaTeX content to see rendered output
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
