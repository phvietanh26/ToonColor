import React from 'react';
import { motion } from 'framer-motion';
import { hsbToHex } from '@/utils/colorMath';
import ScoreBadge from '@/components/game/ScoreBadge';
import { ArrowRight } from 'lucide-react';

export default function ResultRoundScreen({ question, playerHSB, score, questionIndex, totalQuestions, onNext }) {
  const playerHex = hsbToHex(playerHSB.h, playerHSB.s, playerHSB.b);
  const answerHex = hsbToHex(question.answer.h, question.answer.s, question.answer.b);
  const isLast = questionIndex + 1 >= totalQuestions;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: 'var(--color-bg-page)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-pill text-sm font-semibold mb-3"
            style={{ backgroundColor: 'rgba(66,85,255,0.08)', color: 'var(--color-primary)' }}>
            Round {questionIndex + 1} / {totalQuestions}
          </span>
          <h2 className="text-2xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
            {question.character} — {question.part}
          </h2>
        </div>

        {/* Score */}
        <div className="bg-white rounded-3xl p-8 border mb-4 text-center"
          style={{ borderColor: 'hsl(var(--border))', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            Your Score
          </p>
          <ScoreBadge score={score} size="lg" />
        </div>

        {/* Color Comparison */}
        <div className="bg-white rounded-3xl p-6 border mb-6"
          style={{ borderColor: 'hsl(var(--border))', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-center"
            style={{ color: 'var(--color-text-secondary)' }}>
            Color Comparison
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <ColorBlock hex={playerHex} hsb={playerHSB} label="Your Color" />
            <ColorBlock hex={answerHex} hsb={question.answer} label="Original Color" isAnswer />
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={onNext}
          className="w-full py-4 font-bold text-base text-white rounded-pill flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
          style={{
            backgroundColor: 'var(--color-primary)',
            transitionTimingFunction: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        >
          {isLast ? 'See Final Results' : 'Next Question'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
}

function ColorBlock({ hex, hsb, label, isAnswer }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-full h-20 rounded-2xl shadow-md"
        style={{
          backgroundColor: hex,
          boxShadow: `0 6px 20px ${hex}55`,
          outline: isAnswer ? '2px solid var(--color-primary)' : 'none',
          outlineOffset: '2px',
        }}
      />
      <span className="text-xs font-bold uppercase tracking-wide"
        style={{ color: isAnswer ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
        {label}
      </span>
      <span className="font-mono text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {hex.toUpperCase()}
      </span>
      <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
        H:{hsb.h}° S:{hsb.s}% B:{hsb.b}%
      </span>
    </div>
  );
}