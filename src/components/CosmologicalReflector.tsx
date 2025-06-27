
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Brain, Infinity, Hash, Clock } from 'lucide-react';

interface CosmologicalStructure {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  currentReflection: string;
}

export const CosmologicalReflector = () => {
  const [activeStructure, setActiveStructure] = useState(0);
  const [reflectionCycle, setReflectionCycle] = useState(0);
  const [isThinking, setIsThinking] = useState(true);

  const cosmologicalStructures: CosmologicalStructure[] = [
    {
      id: 'finite-finite',
      title: 'Finite Number of Finite Universes',
      icon: <Hash className="w-5 h-5" />,
      description: 'Bounded multiplicity, bounded extension',
      currentReflection: 'If reality consists of a finite collection of finite universes, then totality itself is bounded. Each universe, being finite, contains only a limited arrangement of matter and energy. The meta-question emerges: what lies beyond this finite collection? Is there a void, or does the very concept of "beyond" become meaningless when dealing with the totality of finite existence?'
    },
    {
      id: 'finite-infinite',
      title: 'Finite Number of Infinite Universes',
      icon: <div className="flex items-center"><Hash className="w-4 h-4" /><Infinity className="w-4 h-4" /></div>,
      description: 'Bounded multiplicity, unbounded extension',
      currentReflection: 'A finite count of infinite universes presents a fascinating paradox. Each universe, being infinite, already contains unlimited space, matter, and possibility. Yet there are only finitely many such infinities. This suggests a hierarchy of infinities - the infinite within each universe versus the finite number of such containers. How do these infinite realms relate to each other? Do they intersect, run parallel, or exist in complete isolation?'
    },
    {
      id: 'infinite-finite',
      title: 'Infinite Number of Finite Universes',
      icon: <div className="flex items-center"><Infinity className="w-4 h-4" /><Hash className="w-4 h-4" /></div>,
      description: 'Unbounded multiplicity, bounded extension',
      currentReflection: 'An infinite collection of finite universes suggests endless diversity within bounded containers. Each universe, though finite, could contain unique physical laws, constants, and evolutionary pathways. The infinite multiplicity ensures that every possible finite configuration not only exists but exists infinitely many times. This raises profound questions about identity, uniqueness, and the nature of possibility itself.'
    },
    {
      id: 'infinite-infinite',
      title: 'Infinite Number of Infinite Universes',
      icon: <div className="flex items-center"><Infinity className="w-4 h-4" /><Infinity className="w-4 h-4" /></div>,
      description: 'Unbounded multiplicity, unbounded extension',
      currentReflection: 'The ultimate cosmological scenario - infinite infinities. Here, both the number of universes and the size of each universe stretch beyond all bounds. This represents the maximally expansive reality, where every possible infinite configuration exists infinitely many times. The philosophical implications are staggering: in such a cosmos, every conceivable infinite structure, every possible infinite narrative, every infinite pattern of existence is not just possible but actual, and actual infinitely many times over.'
    }
  ];

  const reflections = {
    'finite-finite': [
      'If reality consists of a finite collection of finite universes, then totality itself is bounded. Each universe, being finite, contains only a limited arrangement of matter and energy.',
      'The paradox of finite totality: if everything that exists is contained within these finite universes, what defines the boundary? Is there truly "nothing" beyond, or does the concept of boundary itself become meaningless?',
      'In such a cosmos, uniqueness gains profound meaning. Every configuration of matter, every possible arrangement, every potential story has limits. Scarcity becomes the fundamental principle of existence.',
      'The meta-question emerges: what maintains the separation between these finite universes? Is there a medium, a void, or does each universe exist in complete isolation from others?'
    ],
    'finite-infinite': [
      'A finite count of infinite universes presents a fascinating paradox. Each universe, being infinite, already contains unlimited space, matter, and possibility.',
      'How do finite infinities relate? If Universe A and Universe B are both infinite, do they intersect, run parallel, or exist in complete isolation? The topology of infinite separation becomes crucial.',
      'Within each infinite universe, every possible finite configuration exists infinitely many times. Yet across the finite collection of such universes, there might be fundamental differences in physical laws or mathematical structures.',
      'The observer paradox intensifies here: from within any infinite universe, the existence of other infinite universes becomes undetectable through direct observation, yet logically necessary.'
    ],
    'infinite-finite': [
      'An infinite collection of finite universes suggests endless diversity within bounded containers. Each universe, though finite, represents a complete, self-contained reality.',
      'The principle of plenitude emerges: if there are infinitely many finite universes, then every possible finite configuration not only exists but exists infinitely many times across different universes.',
      'This structure raises questions about identity and uniqueness. If there are infinitely many universes identical to this one, what makes any particular instance special or meaningful?',
      'The combinatorial explosion becomes infinite: every possible arrangement of finite matter, every possible set of physical constants, every possible evolutionary pathway exists somewhere in this infinite multiverse.'
    ],
    'infinite-infinite': [
      'The ultimate cosmological scenario - infinite infinities. Here, both the number of universes and the size of each universe stretch beyond all bounds.',
      'In such a cosmos, every conceivable infinite structure exists infinitely many times. Every possible infinite narrative, every infinite pattern of existence, every infinite mathematical object finds physical instantiation.',
      'The hierarchy of infinities becomes critical: are all these infinite universes of the same cardinality? Could some contain higher orders of infinity than others?',
      'This represents maximal reality - the most expansive possible cosmos where limitation exists only as a local, temporary phenomenon within infinite expanses of unlimited possibility.',
      'The philosophical implications are staggering: consciousness, meaning, and purpose must be reconsidered in a reality where everything infinite happens infinitely many times.'
    ]
  };

  useEffect(() => {
    const structureInterval = setInterval(() => {
      setActiveStructure((prev) => (prev + 1) % 4);
      setReflectionCycle(0);
    }, 15000); // Switch structures every 15 seconds

    return () => clearInterval(structureInterval);
  }, []);

  useEffect(() => {
    const reflectionInterval = setInterval(() => {
      const currentStructureId = cosmologicalStructures[activeStructure].id;
      const availableReflections = reflections[currentStructureId as keyof typeof reflections];
      setReflectionCycle((prev) => (prev + 1) % availableReflections.length);
      
      // Thinking animation
      setIsThinking(true);
      setTimeout(() => setIsThinking(false), 1000);
    }, 8000); // Switch reflections every 8 seconds

    return () => clearInterval(reflectionInterval);
  }, [activeStructure]);

  const currentStructure = cosmologicalStructures[activeStructure];
  const currentReflections = reflections[currentStructure.id as keyof typeof reflections];
  const currentReflection = currentReflections[reflectionCycle];

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-purple-500/30 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-purple-300 flex items-center space-x-2">
          <Brain className="w-5 h-5" />
          <span>Cosmological Contemplator</span>
        </h3>
        <div className="flex items-center space-x-2 text-xs text-purple-400">
          <div className={`w-2 h-2 rounded-full ${isThinking ? 'bg-purple-400 animate-pulse' : 'bg-purple-600'}`}></div>
          <span>{isThinking ? 'Contemplating...' : 'Reflecting'}</span>
        </div>
      </div>

      {/* Structure Indicators */}
      <div className="flex space-x-2 mb-4">
        {cosmologicalStructures.map((structure, index) => (
          <div
            key={structure.id}
            className={`flex-1 p-2 rounded-lg border transition-all duration-500 ${
              index === activeStructure
                ? 'bg-purple-600/30 border-purple-400/60'
                : 'bg-purple-900/20 border-purple-700/30'
            }`}
          >
            <div className="flex items-center justify-center mb-1">
              {structure.icon}
            </div>
            <div className="text-xs text-center text-purple-200">
              {structure.title.split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
        ))}
      </div>

      {/* Current Structure */}
      <div className="mb-4">
        <h4 className="font-semibold text-white mb-1 flex items-center space-x-2">
          {currentStructure.icon}
          <span>{currentStructure.title}</span>
        </h4>
        <p className="text-sm text-purple-300 italic">{currentStructure.description}</p>
      </div>

      {/* Current Reflection */}
      <div className="bg-black/30 rounded-lg p-4 border border-purple-600/20">
        <div className="flex items-center space-x-2 mb-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-400">Current Contemplation</span>
        </div>
        <p className="text-white text-sm leading-relaxed">
          {currentReflection}
        </p>
      </div>

      {/* Thinking Progress */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-purple-400 mb-1">
          <span>Reflection Cycle</span>
          <span>{reflectionCycle + 1} / {currentReflections.length}</span>
        </div>
        <div className="w-full bg-purple-900/30 rounded-full h-1">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-8000 ease-linear"
            style={{ width: `${((reflectionCycle + 1) / currentReflections.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-3 text-xs text-purple-400/60 text-center">
        Perpetually contemplating the fundamental structures of reality
      </div>
    </Card>
  );
};
