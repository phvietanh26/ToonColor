import React from 'react';
import { motion } from 'framer-motion';
import { hsbToHex, getScoreBand } from '@/utils/colorMath';
import { Trophy, RotateCcw, Home } from 'lucide-react';

export default function FinalScreen({ results, questions, onPlayAgain, onHome }) {
  const totalScore = results.reduce((sum, r) => sum + r.score, 0);
  const { label, color } = getScoreBand(totalScore);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ backgroundColor: 'transparent' }}>
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
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: '#fff' }}>
            Kết thúc!
          </h1>
          <p className="text-lg font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {label}
          </p>
        </div>

        {/* Total Score Card */}
        <div className="rounded-3xl p-8 border mb-4 text-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Tổng điểm
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
        <div className="rounded-3xl p-6 border mb-6"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            Chi tiết từng vòng
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
          <p className="text-xs mt-3 text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Nửa trái = màu bạn chọn · Nửa phải = màu gốc
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
            Trang chủ
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
            Chơi lại
          </button>
        </div>
      </motion.div>
    </div>
  );
}