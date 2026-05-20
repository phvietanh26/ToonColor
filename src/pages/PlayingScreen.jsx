import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProgressBar from '@/components/game/ProgressBar';
import CombinedColorPicker from '@/components/game/CombinedColorPicker';


export default function PlayingScreen({ question, questionIndex, totalQuestions, onConfirm }) {
  const [hsb, setHsb] = useState({ h: 180, s: 50, b: 80 });
  const [imgError, setImgError] = useState(false);

  const handleConfirm = () => {
    onConfirm(hsb);
  };

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
          className="mb-8 text-center">
          
          <span className="inline-block px-4 py-1.5 rounded-pill text-sm font-semibold mb-3"
          style={{ backgroundColor: 'rgba(66,85,255,0.18)', color: 'var(--color-primary)' }}>
            Câu {questionIndex + 1} / {totalQuestions}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#fff' }}>
            Màu <span style={{ color: 'var(--color-primary)' }}>{question.part}</span> của{' '}
            <span style={{ color: 'var(--color-primary)' }}>{question.character}</span> là màu gì?
          </h2>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {question.show}
          </p>
        </motion.div>

        {/* Main 2-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* LEFT — Character image */}
          <div className="flex flex-col">
            <div className="flex-1 rounded-3xl overflow-hidden border flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
              {imgError ?
              <div className="flex flex-col items-center gap-3 text-center">
                  <div className="text-6xl">🎨</div>
                  <div className="font-bold text-lg" style={{ color: '#fff' }}>
                    {question.character}
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {question.hint}
                  </div>
                </div> :

              <img
                src={question.image_url}
                alt={question.character}
                className="w-full h-full object-contain"
                onError={() => setImgError(true)} />

              }
            </div>
            

            
          </div>

          {/* RIGHT — Combined Color Picker */}
          <div className="flex flex-col">
            <CombinedColorPicker
              hsb={hsb}
              onChange={setHsb}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onConfirm={handleConfirm} />
            
          </div>
        </div>
      </div>
    </div>);

}