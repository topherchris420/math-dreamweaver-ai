
import { useState, useEffect } from 'react';
import { MathDomain } from '@/pages/Index';
import { ConversationHistory } from '@/components/ConversationHistory';
import { AISuggestions } from '@/components/AISuggestions';
import { MathInputArea } from '@/components/MathInputArea';

interface MathWorkspaceProps {
  domain: MathDomain;
  onDiscovery: (discovery: any) => void;
}

export const MathWorkspace = ({ domain, onDiscovery }: MathWorkspaceProps) => {
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState<Array<{id: string, human: string, ai: string, insights: string[]}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    generateAISuggestions();
  }, [domain]);

  const generateAISuggestions = async () => {
    const suggestions = {
      'topology': [
        'What if we consider the fundamental group of this space?',
        'Could we apply homological methods here?',
        'I notice a pattern in the homotopy groups...',
        'This reminds me of the Poincaré conjecture approach'
      ],
      'number-theory': [
        'The distribution suggests a connection to the Riemann hypothesis',
        'Have you considered the p-adic implications?',
        'This sequence might relate to modular forms',
        'The multiplicative structure here is intriguing'
      ],
      'combinatorics': [
        'The generating function approach might reveal more',
        'This could be related to symmetric functions',
        'I see a potential bijection with another structure',
        'The asymptotic behavior suggests exponential growth'
      ],
      'algebraic-geometry': [
        'The variety\'s dimension suggests hidden symmetries',
        'Could we apply Grothendieck\'s machinery here?',
        'The singularities might encode important information',
        'This reminds me of mirror symmetry principles'
      ],
      'analysis': [
        'The convergence pattern suggests deeper structure',
        'Could complex analysis techniques apply here?',
        'The function\'s behavior near singularities is key',
        'This might connect to harmonic analysis'
      ]
    };
    
    setAiSuggestions(suggestions[domain] || []);
  };

  const processWithAI = async (userInput: string) => {
    setIsProcessing(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiResponse = generateAIResponse(userInput, domain);
    const insights = extractInsights(userInput, aiResponse);
    
    const newConversation = {
      id: Date.now().toString(),
      human: userInput,
      ai: aiResponse,
      insights
    };
    
    setConversations(prev => [...prev, newConversation]);
    onDiscovery({ 
      theorems: insights.filter(i => i.includes('theorem')),
      conjectures: insights.filter(i => i.includes('conjecture')),
      patterns: insights.filter(i => i.includes('pattern'))
    });
    
    setIsProcessing(false);
    setInput('');
  };

  const generateAIResponse = (input: string, domain: MathDomain): string => {
    const responses = {
      'topology': `Fascinating! In the topological context, your observation about "${input}" suggests we should examine the underlying space's connectivity properties. I notice this could relate to fundamental groups and covering spaces. Let me propose a conjecture: if we consider the universal cover, we might find invariant structures that weren't immediately apparent.`,
      
      'number-theory': `Intriguing! Your insight about "${input}" opens up several avenues. The arithmetic properties here suggest a deep connection to L-functions and automorphic forms. I'm particularly drawn to how this might relate to the Langlands program. Shall we explore the p-adic aspects?`,
      
      'combinatorics': `Excellent observation! The combinatorial structure in "${input}" reveals beautiful symmetries. I can see connections to symmetric functions and possibly generating function techniques. This pattern might generalize to a broader class of combinatorial objects. Let's investigate the asymptotic behavior.`,
      
      'algebraic-geometry': `Your geometric intuition about "${input}" is spot-on! This variety's properties suggest we're dealing with something quite special. The cohomological dimensions hint at deeper algebraic structures. I wonder if this connects to recent developments in derived categories?`,
      
      'analysis': `Brilliant insight! The analytic behavior you've identified in "${input}" shows remarkable regularity. The singularities seem to encode fundamental information about the underlying function space. This might connect to recent work in harmonic analysis and operator theory.`
    };
    
    return responses[domain] || 'Let me analyze this mathematical structure more deeply...';
  };

  const extractInsights = (input: string, response: string): string[] => {
    return [
      'Pattern identified: Recursive structure in mathematical object',
      'Conjecture: This property might generalize to higher dimensions',
      'Connection: Links to classical results in ' + domain,
      'Open question: Computational complexity implications'
    ];
  };

  return (
    <div className="h-full bg-slate-800/30 backdrop-blur-sm rounded-xl border border-blue-700/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-blue-300">Mathematical Collaboration Workspace</h2>
        <div className="flex items-center space-x-2 text-sm text-blue-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>AI Co-Researcher Active</span>
        </div>
      </div>

      <ConversationHistory conversations={conversations} />
      
      <AISuggestions 
        domain={domain}
        suggestions={aiSuggestions}
        onSuggestionClick={setInput}
      />

      <MathInputArea
        input={input}
        setInput={setInput}
        domain={domain}
        isProcessing={isProcessing}
        onSubmit={processWithAI}
      />
    </div>
  );
};
