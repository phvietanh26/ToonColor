import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Users } from 'lucide-react';

const FACEBOOK_URL = 'https://www.facebook.com';

const navItems = [
  { icon: Home, label: 'Trang chủ', to: '/', internal: true },
  { icon: Trophy, label: 'Bảng xếp hạng', to: '/leaderboard', internal: true },
  { icon: Users, label: 'Cộng đồng', to: FACEBOOK_URL, internal: false },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  return (
    <div
      className="fixed left-0 top-0 h-full z-50 flex flex-col py-8 px-3 gap-2 transition-all duration-300"
      style={{
        width: expanded ? '180px' : '60px',
        background: 'rgba(10, 9, 45, 0.55)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo dot */}
      <div className="flex items-center gap-3 px-1 mb-6 overflow-hidden">
        <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-primary)' }}>
          <span className="text-white font-extrabold text-xs">TC</span>
        </div>
        {expanded && (
          <span className="text-white font-extrabold text-sm whitespace-nowrap transition-opacity duration-200">
            ToonColor
          </span>
        )}
      </div>

      {/* Nav items */}
      {navItems.map(({ icon: Icon, label, to, internal }) => {
        const isActive = internal && location.pathname === to;
        return internal ? (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-1 py-3 rounded-xl transition-all duration-150 overflow-hidden"
            style={{
              backgroundColor: isActive ? 'rgba(66,85,255,0.25)' : 'transparent',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
              minHeight: '44px',
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {expanded && (
              <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
            )}
          </Link>
        ) : (
          <a
            key={to}
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-1 py-3 rounded-xl transition-all duration-150 overflow-hidden"
            style={{
              color: 'rgba(255,255,255,0.55)',
              minHeight: '44px',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            {expanded && (
              <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}