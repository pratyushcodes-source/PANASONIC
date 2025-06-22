import React from 'react';
import { Sparkles } from 'lucide-react'; // Changed from HelpCircle

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
}

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ questions, onQuestionClick }) => {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-5 border-b border-slate-700 bg-slate-800/70 shadow-md"> {/* Increased py */}
      <div className="flex items-center mb-4 text-base font-semibold text-sky-200"> {/* Changed icon, size, color, mb */}
        <Sparkles size={20} className="mr-2.5 opacity-90 text-sky-300" /> {/* Changed icon, size, mr */}
        <span className="font-semibold">Popular Questions:</span> {/* Changed text */}
      </div>
      <div className="flex flex-row flex-wrap gap-3 justify-center"> {/* Kept mt-3, adjusted gap if needed or rely on overall padding */}
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="flex flex-col items-center justify-center text-center
                       bg-slate-700 hover:bg-slate-600/80 text-gray-100 text-sm /* Changed text size */
                       w-40 h-28 p-3 /* Increased w, h, p */ 
                       rounded-lg transition-all duration-150 ease-in-out 
                       focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 
                       shadow hover:shadow-lg transform hover:scale-105"
            aria-label={`Ask: ${question}`}
            title={question} 
          >
            <span className="line-clamp-4">{question}</span> {/* Increased line-clamp */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;