import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Target, Trophy } from 'lucide-react';

export default function IntroScreen({ onStart }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12"
    style={{ backgroundColor: 'transparent' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.47, 0, 0.745, 0.715] }}
        className="w-full max-w-lg">
        
        {/* Logo / Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-primary)' }}>
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-7xl" style={{ color: '#ffffff' }}>
              ToonColor
            </span>
          </div>
          

          
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Hãy điều chỉnh màu sắc chính xác của các nhân vật bằng cách điều chỉnh thanh màu sắc, độ đậm, độ sáng
          </p>
        </div>

        {/* Rule Cards */}
        <div className="flex flex-col gap-3 mb-8">
          <RuleCard
            icon={<Target className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />}
            title="5 câu hỏi mỗi lượt"
            desc="Mỗi vòng, bạn sẽ thấy một nhân vật và phải khớp đúng màu sắc của nó."
            bg="rgba(66,85,255,0.12)" />
          
          <RuleCard
            icon={<Palette className="w-5 h-5" style={{ color: '#23B9A4' }} />}
            title="Điều chỉnh thanh HSB"
            desc="Kéo Hue, Saturation & Brightness để khớp với màu gốc."
            bg="rgba(35,185,164,0.12)" />
          
          <RuleCard
            icon={<Trophy className="w-5 h-5" style={{ color: '#F5A623' }} />}
            title="Tối đa 50 điểm"
            desc="Màu càng gần, điểm càng cao. Khớp hoàn hảo = 10 điểm!"
            bg="rgba(245,166,35,0.12)" />
          
        </div>

        {/* Color Preview Strip */}
        <div className="flex h-6 rounded-full overflow-hidden mb-8 shadow-sm">
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((hue) =>
          <div key={hue} className="flex-1"
          style={{ backgroundColor: `hsl(${hue}, 80%, 55%)` }} />
          )}
        </div>

        {/* Start Button */}
        <button
          onClick={onStart}
          className="w-full py-4 text-lg font-bold text-white rounded-pill transition-all duration-150 hover:-translate-y-0.5 active:scale-95"
          style={{
            backgroundColor: 'var(--color-primary)',
            transitionTimingFunction: 'cubic-bezier(0.47, 0, 0.745, 0.715)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}>
          
          Bắt đầu chơi →
        </button>
      </motion.div>
    </div>);

}

function RuleCard({ icon, title, desc, bg }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ backgroundColor: bg }}>
      <div className="mt-0.5 shrink-0">{icon}</div>
      <div>
        <div className="font-bold text-sm mb-0.5" style={{ color: '#fff' }}>{title}</div>
        <div className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{desc}</div>
      </div>
    </div>);

}