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
      style={{ backgroundColor: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-1.5 rounded-pill text-sm font-semibold mb-3"
            style={{ backgroundColor: 'rgba(66,85,255,0.18)', color: 'var(--color-primary)' }}>
            Vòng {questionIndex + 1} / {totalQuestions}
          </span>
          <h2 className="text-2xl font-extrabold" style={{ color: '#fff' }}>
            {question.character} — {question.part}
          </h2>
        </div>

        {/* Score */}
        <div className="rounded-3xl p-8 border mb-4 text-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
          <p className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Điểm của bạn
          </p>
          <ScoreBadge score={score} size="lg" />
        </div>

        {/* Color Comparison */}
        <div className="rounded-3xl p-6 border mb-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-5 text-center"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            So sánh màu sắc
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <ColorBlock hex={playerHex} hsb={playerHSB} label="Màu của bạn" />
            <ColorBlock hex={answerHex} hsb={question.answer} label="Màu gốc" isAnswer />
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
          {isLast ? 'Xem kết quả cuối' : 'Câu tiếp theo'}
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
        style={{ color: isAnswer ? 'var(--color-primary)' : 'rgba(255,255,255,0.55)' }}>
        {label}
      </span>
      <span className="font-mono text-xs font-semibold" style={{ color: '#fff' }}>
        {hex.toUpperCase()}
      </span>
      <span className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
        H:{hsb.h}° S:{hsb.s}% B:{hsb.b}%
      </span>
    </div>
  );
}