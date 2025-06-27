
import { Card } from '@/components/ui/card';

interface Conversation {
  id: string;
  human: string;
  ai: string;
  insights: string[];
}

interface ConversationHistoryProps {
  conversations: Conversation[];
}

export const ConversationHistory = ({ conversations }: ConversationHistoryProps) => {
  return (
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
  );
};
