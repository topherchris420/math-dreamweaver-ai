
import { useState, useEffect } from 'react';
import { MathDomain } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface MathWorkspaceProps {
  domain: MathDomain;
  onDiscovery: (discovery: any) => void;
}

const domainPrompts = {
  'topology': 'Let\'s explore topological spaces and continuous mappings...',
  'number-theory': 'Consider the distribution of prime numbers and arithmetic functions...',
  'combinatorics': 'Investigate combinatorial structures and counting principles...',
  'algebraic-geometry': 'Examine algebraic varieties and geometric properties...',
  'analysis': 'Study analytic functions and convergence properties...'
};

export const MathWorkspace = ({ domain, onDiscovery }: MathWorkspaceProps) => {
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState<Array<{id: string, human: string, ai: string, insights: string[]}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  useEffect(() => {
    // Generate domain-specific AI suggestions
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
    
    // Simulate AI processing and mathematical reasoning
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

      {/* Conversation History */}
      <div className="flex-1 space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
        {conversations.map((conv) => (
          <div key={conv.id} className="space-y-3">
            {/* Human Input */}
            <div className="bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">You</span>
                </div>
                <span className="text-sm text-blue-300">Human Mathematician</span>
              </div>
              <p className="text-white">{conv.human}</p>
            </div>

            {/* AI Response */}
            <div className="bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">AI</span>
                </div>
                <span className="text-sm text-purple-300">AI Co-Researcher</span>
              </div>
              <p className="text-white mb-3">{conv.ai}</p>
              
              {/* Insights */}
              <div className="mt-3 pt-3 border-t border-purple-700/30">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">Mathematical Insights:</h4>
                <ul className="space-y-1">
                  {conv.insights.map((insight, idx) => (
                    <li key={idx} className="text-sm text-purple-200 flex items-start space-x-2">
                      <span className="text-purple-400 mt-1">•</span>
                      <span>{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-green-300 mb-2">AI Suggestions for {domain}:</h4>
          <div className="grid grid-cols-2 gap-2">
            {aiSuggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInput(suggestion)}
                className="text-left p-2 bg-green-900/20 rounded-lg border border-green-700/30 hover:bg-green-800/30 transition-colors text-sm text-green-200"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="space-y-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={domainPrompts[domain]}
          className="min-h-[100px] bg-slate-900/50 border-blue-700/30 text-white placeholder-blue-400/60"
        />
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-blue-400">
            Exploring: <span className="capitalize font-semibold">{domain.replace('-', ' ')}</span>
          </div>
          
          <Button
            onClick={() => processWithAI(input)}
            disabled={!input.trim() || isProcessing}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6"
          >
            {isProcessing ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>AI Thinking...</span>
              </span>
            ) : (
              'Collaborate with AI'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
