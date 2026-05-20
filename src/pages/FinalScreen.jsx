import React from 'react';
import { motion } from 'framer-motion';
import { hsbToHex, getScoreBand } from '@/utils/colorMath';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export default function FinalScreen({ results, questions, onPlayAgain, onHome }) {
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const { label, color } = getScoreBand(totalScore);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: 'var(--color-bg-page)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-lg"
      >
        {/* Trophy + Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-4"
            style={{ backgroundColor: `${color}18` }}>
            <Trophy className="w-8 h-8" style={{ color }} />
          </div>
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Game Over!
          </h1>
          <p className="text-lg font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
            {label}
          </p>
        </div>

        {/* Total Score Card */}
        <div className="bg-white rounded-3xl p-8 border mb-4 text-center"
          style={{ borderColor: 'hsl(var(--border))', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-secondary)' }}>
            Total Score
          </p>
          <div className="flex items-end justify-center gap-1">
            <span className="text-6xl font-extrabold tabular-nums" style={{ color }}>
              {totalScore.toFixed(2)}
            </span>
            <span className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              / 50
            </span>
          </div>
        </div>

        {/* Per-round thumbnails */}
        <div className="bg-white rounded-3xl p-6 border mb-6"
          style={{ borderColor: 'hsl(var(--border))', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4"
            style={{ color: 'var(--color-text-secondary)' }}>
            Round Breakdown
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {results.map((r, i) => {
              const pct = r.score / 10;
              const tileColor = pct >= 0.8 ? '#2ECC71' : pct >= 0.5 ? '#4255FF' : pct >= 0.3 ? '#F5A623' : '#E53E3E';
              const playerHex = hsbToHex(r.playerHSB.h, r.playerHSB.s, r.playerHSB.b);
              const answerHex = hsbToHex(questions[i].answer.h, questions[i].answer.s, questions[i].answer.b);

              return (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="w-full aspect-square rounded-xl overflow-hidden flex"
                    style={{ border: `2px solid ${tileColor}` }}>
                    <div className="w-1/2 h-full" style={{ backgroundColor: playerHex }} />
                    <div className="w-1/2 h-full" style={{ backgroundColor: answerHex }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: tileColor }}>
                    {r.score.toFixed(1)}
                  </span>
                  <span className="text-xs text-center leading-tight"
                    style={{ color: 'var(--color-text-secondary)', fontSize: '10px' }}>
                    {questions[i].part}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>
            Left half = your color · Right half = original
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 py-4 font-bold text-base rounded-pill flex items-center justify-center gap-2 border-2 transition-all duration-150 hover:-translate-y-0.5"
            style={{
              color: 'var(--color-primary)',
              borderColor: 'var(--color-primary)',
              backgroundColor: 'transparent',
              transitionTimingFunction: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(66,85,255,0.06)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Home className="w-4 h-4" />
            Home
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-4 font-bold text-base text-white rounded-pill flex items-center justify-center gap-2 transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
            style={{
              backgroundColor: 'var(--color-primary)',
              transitionTimingFunction: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
}