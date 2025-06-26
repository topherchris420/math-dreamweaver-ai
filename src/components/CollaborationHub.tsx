
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const CollaborationHub = () => {
  const [collaborators] = useState([
    { id: 1, name: 'AI Theorem Prover', specialty: 'Automated Reasoning', status: 'active', avatar: '🤖' },
    { id: 2, name: 'Symbolic Solver', specialty: 'Computer Algebra', status: 'active', avatar: '∑' },
    { id: 3, name: 'Pattern Analyzer', specialty: 'Machine Learning', status: 'analyzing', avatar: '🔍' },
    { id: 4, name: 'Conjecture Generator', specialty: 'Hypothesis Formation', status: 'thinking', avatar: '💡' }
  ]);

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'text-green-400',
      analyzing: 'text-blue-400',
      thinking: 'text-yellow-400',
      idle: 'text-gray-400'
    };
    return colors[status as keyof typeof colors] || 'text-gray-400';
  };

  const getStatusDot = (status: string) => {
    const colors = {
      active: 'bg-green-400',
      analyzing: 'bg-blue-400 animate-pulse',
      thinking: 'bg-yellow-400 animate-pulse',
      idle: 'bg-gray-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-400';
  };

  return (
    <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-700/30 p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-purple-300">AI Collaborators</h3>
        <div className="text-xs text-purple-400">{collaborators.filter(c => c.status === 'active').length} Active</div>
      </div>

      <div className="space-y-2">
        {collaborators.map((collaborator) => (
          <div key={collaborator.id} className="bg-slate-900/30 rounded-lg p-3 border border-purple-700/20">
            <div className="flex items-center space-x-3">
              <div className="text-lg">{collaborator.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white truncate">{collaborator.name}</span>
                  <div className={`w-2 h-2 rounded-full ${getStatusDot(collaborator.status)}`}></div>
                </div>
                <p className="text-xs text-purple-200">{collaborator.specialty}</p>
                <p className={`text-xs capitalize ${getStatusColor(collaborator.status)}`}>{collaborator.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button 
        size="sm" 
        className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs"
      >
        Coordinate Team
      </Button>
    </Card>
  );
};
