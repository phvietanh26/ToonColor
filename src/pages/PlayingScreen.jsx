import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from '@/components/game/ProgressBar';
import CombinedColorPicker from '@/components/game/CombinedColorPicker';
import { hsbToHex, calculateScore } from '@/utils/colorMath';
import { ArrowRight } from 'lucide-react';

export default function PlayingScreen({ question, questionIndex, totalQuestions, onConfirm, onNext }) {
  const [hsb, setHsb] = useState({ h: 180, s: 50, b: 80 });
  const [imgError, setImgError] = useState(false);
  const [result, setResult] = useState(null); // null = playing, object = showing result

  const handleConfirm = () => {
    const score = calculateScore(hsb, question.answer);
    setResult({ playerHSB: hsb, score });
    onConfirm(hsb); // still report to parent for score tracking
  };

  const isLast = questionIndex + 1 >= totalQuestions;
  const playerHex = result ? hsbToHex(result.playerHSB.h, result.playerHSB.s, result.playerHSB.b) : null;
  const answerHex = hsbToHex(question.answer.h, question.answer.s, question.answer.b);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'transparent' }}>
      {/* Navbar */}
      <nav className="w-full h-16 flex items-center justify-between px-6"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="font-extrabold text-lg" style={{ color: 'var(--color-primary)' }}>
          ToonColor
        </span>
        <ProgressBar current={questionIndex + 1} total={totalQuestions} />
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
        {/* Question label */}
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-8 text-center"
        >
          <p className="text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            What is the color of
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#fff' }}>
            <span style={{ color: 'var(--color-primary)' }}>{question.character}</span>'s{' '}
            <span style={{ color: 'var(--color-primary)' }}>{question.part}</span>{' '}
            <span style={{ color: '#fff' }}>from</span>{' '}
            <span style={{ color: 'var(--color-primary)' }}>{question.show}</span>?
          </h2>
        </motion.div>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT — Character image */}
          <div className="flex flex-col">
            <div
              className="flex-1 rounded-3xl overflow-hidden border flex items-center justify-center p-6"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderColor: 'rgba(255,255,255,0.1)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                minHeight: '300px',
              }}
            >
              {imgError ? (
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="text-6xl">🎨</div>
                  <div className="font-bold text-lg" style={{ color: '#fff' }}>{question.character}</div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>{question.hint}</div>
                </div>
              ) : (
                <img
                  src={question.image_url}
                  alt={question.character}
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>

          {/* RIGHT — Color Picker OR Result Panel */}
          <div className="flex flex-col" style={{ minHeight: '360px' }}>
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="picker"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 flex flex-col"
                >
                  <CombinedColorPicker
                    hsb={hsb}
                    onChange={setHsb}
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}
                    onConfirm={handleConfirm}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col rounded-3xl overflow-hidden"
                  style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
                >
                  {/* Top half — player selection */}
                  <div
                    className="flex-1 flex flex-col justify-center px-7 py-6"
                    style={{ backgroundColor: playerHex }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-1"
                          style={{ color: 'rgba(255,255,255,0.7)' }}>
                          Your Selection
                        </p>
                        <p className="text-sm font-mono font-semibold"
                          style={{ color: 'rgba(255,255,255,0.85)' }}>
                          H{result.playerHSB.h} S{result.playerHSB.s} B{result.playerHSB.b}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold mb-1"
                          style={{ color: 'rgba(255,255,255,0.6)' }}>
                          ToonColor
                        </p>
                        <p className="text-5xl font-extrabold" style={{ color: '#fff', lineHeight: 1 }}>
                          {result.score.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom half — original answer */}
                  <div
                    className="flex items-center justify-between px-7 py-6"
                    style={{ backgroundColor: answerHex }}
                  >
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-1"
                        style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Original
                      </p>
                      <p className="text-sm font-mono font-semibold"
                        style={{ color: 'rgba(255,255,255,0.85)' }}>
                        H{question.answer.h} S{question.answer.s} B{question.answer.b}
                      </p>
                    </div>

                    {/* Next button */}
                    <button
                      onClick={onNext}
                      className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-110 active:scale-95"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
                      }}
                    >
                      <ArrowRight className="w-6 h-6" style={{ color: '#333' }} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}