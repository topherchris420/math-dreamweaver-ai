
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Citation {
  id: string;
  type: 'theorem' | 'paper' | 'book' | 'webpage';
  title: string;
  authors: string[];
  year: number;
  doi?: string;
  arxiv?: string;
  url?: string;
}

export const CitationManager = () => {
  const [citations, setCitations] = useState<Citation[]>([
    {
      id: '1',
      type: 'theorem',
      title: 'Fundamental Theorem of Algebra',
      authors: ['Gauss, C.F.'],
      year: 1799,
      doi: '10.1007/example'
    },
    {
      id: '2',
      type: 'paper',
      title: 'On the Riemann Hypothesis',
      authors: ['Riemann, B.'],
      year: 1859,
      arxiv: 'math.NT/1859.12345'
    }
  ]);

  const [newCitation, setNewCitation] = useState({
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    doi: '',
    arxiv: ''
  });

  const addCitation = () => {
    if (!newCitation.title.trim()) return;

    const citation: Citation = {
      id: Date.now().toString(),
      type: 'paper',
      title: newCitation.title,
      authors: newCitation.authors.split(',').map(a => a.trim()),
      year: newCitation.year,
      doi: newCitation.doi || undefined,
      arxiv: newCitation.arxiv || undefined
    };

    setCitations(prev => [...prev, citation]);
    setNewCitation({ title: '', authors: '', year: new Date().getFullYear(), doi: '', arxiv: '' });
  };

  const formatCitation = (citation: Citation, format: 'apa' | 'bibtex' = 'apa') => {
    if (format === 'bibtex') {
      return `@article{${citation.id},
  title={${citation.title}},
  author={${citation.authors.join(' and ')}},
  year={${citation.year}},
  ${citation.doi ? `doi={${citation.doi}},` : ''}
  ${citation.arxiv ? `arxiv={${citation.arxiv}},` : ''}
}`;
    }
    
    return `${citation.authors.join(', ')} (${citation.year}). ${citation.title}. ${citation.doi ? `DOI: ${citation.doi}` : citation.arxiv ? `arXiv: ${citation.arxiv}` : ''}`;
  };

  const exportBibliography = () => {
    const bibtex = citations.map(c => formatCitation(c, 'bibtex')).join('\n\n');
    const blob = new Blob([bibtex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bibliography.bib';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-black/30 backdrop-blur-sm border-yellow-500/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-yellow-300">Citation & Bibliography Manager</h3>
        <Button
          size="sm"
          onClick={exportBibliography}
          className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white text-xs"
        >
          Export BibTeX
        </Button>
      </div>

      <div className="space-y-4">
        {/* Add New Citation */}
        <div className="bg-black/50 rounded-lg p-3 border border-yellow-500/20">
          <div className="text-sm text-yellow-300 mb-2">Add Citation</div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <Input
              placeholder="Title"
              value={newCitation.title}
              onChange={(e) => setNewCitation(prev => ({ ...prev, title: e.target.value }))}
              className="bg-black/50 border-yellow-500/30 text-white text-xs"
            />
            <Input
              placeholder="Authors (comma separated)"
              value={newCitation.authors}
              onChange={(e) => setNewCitation(prev => ({ ...prev, authors: e.target.value }))}
              className="bg-black/50 border-yellow-500/30 text-white text-xs"
            />
            <Input
              type="number"
              placeholder="Year"
              value={newCitation.year}
              onChange={(e) => setNewCitation(prev => ({ ...prev, year: parseInt(e.target.value) || new Date().getFullYear() }))}
              className="bg-black/50 border-yellow-500/30 text-white text-xs"
            />
            <Input
              placeholder="DOI (optional)"
              value={newCitation.doi}
              onChange={(e) => setNewCitation(prev => ({ ...prev, doi: e.target.value }))}
              className="bg-black/50 border-yellow-500/30 text-white text-xs"
            />
          </div>
          <Button
            size="sm"
            onClick={addCitation}
            disabled={!newCitation.title.trim()}
            className="w-full bg-yellow-600/50 hover:bg-yellow-600/70 text-white text-xs"
          >
            Add Citation
          </Button>
        </div>

        {/* Citations List */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {citations.map((citation) => (
            <div key={citation.id} className="bg-black/50 rounded-lg p-3 border border-yellow-500/20">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{citation.title}</div>
                  <div className="text-yellow-200 text-xs">
                    {citation.authors.join(', ')} ({citation.year})
                  </div>
                  {citation.doi && (
                    <div className="text-yellow-400 text-xs">DOI: {citation.doi}</div>
                  )}
                  {citation.arxiv && (
                    <div className="text-yellow-400 text-xs">arXiv: {citation.arxiv}</div>
                  )}
                </div>
                <div className={`px-2 py-1 rounded text-xs ${
                  citation.type === 'theorem' ? 'bg-blue-500/20 text-blue-300' :
                  citation.type === 'paper' ? 'bg-green-500/20 text-green-300' :
                  citation.type === 'book' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {citation.type}
                </div>
              </div>
              
              <div className="text-xs text-yellow-200 font-mono bg-yellow-900/10 p-2 rounded">
                {formatCitation(citation)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
