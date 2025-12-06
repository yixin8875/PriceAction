import React, { useState } from 'react';
import { Term } from '../types';
import { RefreshCw } from 'lucide-react';

interface CandleProps {
  term: Term;
  isDark?: boolean;
}

const CandleVisualizer: React.FC<CandleProps> = ({ term, isDark = true }) => {
  const [animationKey, setAnimationKey] = useState(0);

  const replayAnimation = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimationKey(prev => prev + 1);
  };
  
  // Theme configuration
  const theme = {
    grid: isDark ? '#1e293b' : '#e2e8f0', // slate-800 : slate-200
    gridDash: isDark ? '#334155' : '#cbd5e1', // slate-700 : slate-300
    text: isDark ? '#94a3b8' : '#64748b', // slate-400 : slate-500
    wick: isDark ? '#94a3b8' : '#475569', // slate-400 : slate-600
    bull: isDark ? '#10b981' : '#059669', // emerald-500 : emerald-600
    bear: isDark ? '#f43f5e' : '#e11d48', // rose-500 : rose-600
    neutral: isDark ? '#64748b' : '#94a3b8', // slate-500 : slate-400
    accent: '#3b82f6', // blue-500
    bg: isDark ? '#0f172a' : '#ffffff', // slate-900 : white
  };

  // Helper to draw a candle with animation
  const Candle = ({ x, y, width, bodyHeight, wickHeight, color, filled = true, delay = 0, duration = 500 }: any) => (
    <g 
      className="animate-candle" 
      style={{ 
        opacity: 0, 
        animationName: 'fadeInUp', 
        animationDuration: `${duration}ms`, 
        animationDelay: `${delay}ms`, 
        animationFillMode: 'forwards',
        transformBox: 'fill-box',
        transformOrigin: 'bottom center'
      }}
    >
      <line x1={x + width / 2} y1={y - wickHeight} x2={x + width / 2} y2={y + bodyHeight + wickHeight} stroke={color} strokeWidth="2" />
      <rect x={x} y={y} width={width} height={bodyHeight} fill={filled ? color : 'none'} stroke={color} strokeWidth="2" />
    </g>
  );

  const getPath = (id: string) => {
    switch (id) {
      case 'mtr': // Major Trend Reversal
        return (
          <g transform="translate(20, 10)">
             {/* Trend Line Break */}
             <line x1="0" y1="160" x2="120" y2="40" stroke={theme.gridDash} strokeWidth="2" strokeDasharray="5,5" className="animate-fade" style={{ animationDelay: '200ms' }} />
             
             {/* Price Action Path */}
             <path 
               d="M10 150 L 50 80 L 70 110 L 110 50 L 130 90 L 160 60" 
               fill="none" 
               stroke={theme.text} 
               strokeWidth="2" 
               strokeLinecap="round"
               strokeLinejoin="round"
               className="animate-draw"
               style={{ strokeDasharray: 300, strokeDashoffset: 300, animationDuration: '2000ms' }}
             />
             
             {/* Double Top / Lower High Markers */}
             <g className="animate-pop" style={{ animationDelay: '1500ms', opacity: 0 }}>
                <circle cx="110" cy="50" r="4" fill={theme.bear} opacity="0.5" />
                <circle cx="160" cy="60" r="5" fill={theme.bear} stroke={theme.bg} strokeWidth="2" />
                <text x="115" y="30" fill={theme.bear} fontSize="10" fontWeight="bold">DT / LH</text>
             </g>
          </g>
        );

      case 'wedge': // Wedge
        return (
          <g transform="translate(20, 20)">
            <g className="animate-fade" style={{ animationDelay: '500ms' }}>
                <line x1="0" y1="150" x2="200" y2="60" stroke={theme.gridDash} strokeWidth="2" />
                <line x1="0" y1="80" x2="200" y2="60" stroke={theme.gridDash} strokeWidth="2" />
            </g>
            
            <path 
               d="M10 130 L 40 90 L 70 120 L 110 75 L 140 100 L 190 65" 
               fill="none" 
               stroke={theme.text} 
               strokeWidth="2" 
               strokeLinecap="round"
               strokeLinejoin="round"
               className="animate-draw"
               style={{ strokeDasharray: 400, strokeDashoffset: 400, animationDuration: '2500ms' }}
            />
            
            <g>
                <text x="40" y="80" fill={theme.neutral} fontSize="10" className="animate-pop" style={{ animationDelay: '800ms', opacity: 0 }}>1</text>
                <text x="110" y="65" fill={theme.neutral} fontSize="10" className="animate-pop" style={{ animationDelay: '1600ms', opacity: 0 }}>2</text>
                <text x="190" y="55" fill={theme.bear} fontSize="12" fontWeight="bold" className="animate-pop" style={{ animationDelay: '2400ms', opacity: 0 }}>3</text>
            </g>
          </g>
        );

      case 'h1l1': // One-Legged Move
        return (
          <g transform="translate(40, 30)">
            <Candle x={0} y={100} width={15} bodyHeight={40} wickHeight={15} color={theme.bull} delay={100} />
            <Candle x={25} y={80} width={15} bodyHeight={40} wickHeight={15} color={theme.bull} delay={300} />
            <Candle x={50} y={60} width={15} bodyHeight={40} wickHeight={15} color={theme.bull} delay={500} />
            {/* Pullback L1 */}
            <Candle x={75} y={70} width={15} bodyHeight={20} wickHeight={5} color={theme.bear} delay={800} />
            {/* Entry H1 */}
            <Candle x={100} y={50} width={15} bodyHeight={50} wickHeight={15} color={theme.bull} delay={1200} />
            
            <g className="animate-pop" style={{ animationDelay: '1400ms', opacity: 0 }}>
                <text x="85" y="40" fill={theme.bull} fontSize="12" fontWeight="bold">H1 Buy</text>
                <path d="M 90 45 L 105 55" stroke={theme.bull} strokeWidth="1" markerEnd="url(#arrow)" />
            </g>
          </g>
        );

      case 'h2l2': // Two-Legged Move
        return (
          <g transform="translate(30, 30)">
             {/* Trend */}
             <Candle x={0} y={100} width={12} bodyHeight={40} wickHeight={10} color={theme.bull} delay={100} />
             <Candle x={15} y={80} width={12} bodyHeight={40} wickHeight={10} color={theme.bull} delay={300} />
             
             {/* Leg 1 Down */}
             <Candle x={30} y={80} width={12} bodyHeight={15} wickHeight={5} color={theme.bear} delay={500} />
             <text x="30" y="70" fill={theme.bear} fontSize="8" className="animate-fade" style={{ animationDelay: '600ms' }}>L1</text>
             
             {/* Attempt to rally (Failed H1) */}
             <Candle x={45} y={75} width={12} bodyHeight={10} wickHeight={5} color={theme.bull} delay={700} />
             
             {/* Leg 2 Down */}
             <Candle x={60} y={85} width={12} bodyHeight={20} wickHeight={5} color={theme.bear} delay={900} />
             <Candle x={75} y={90} width={12} bodyHeight={25} wickHeight={5} color={theme.bear} delay={1100} />
             <text x="75" y="80" fill={theme.bear} fontSize="8" className="animate-fade" style={{ animationDelay: '1200ms' }}>L2</text>
             
             {/* H2 Entry Signal */}
             <Candle x={95} y={60} width={15} bodyHeight={60} wickHeight={10} color={theme.bull} delay={1300} />
             
             <g className="animate-pop" style={{ animationDelay: '1500ms', opacity: 0 }}>
                <text x="100" y="40" fill={theme.bull} fontSize="12" fontWeight="bold">H2 Buy</text>
                <path d="M 105 45 L 105 55" stroke={theme.bull} strokeWidth="1" markerEnd="url(#arrow)" />
             </g>
          </g>
        );
      
      case 'a2': // A2 at EMA
        return (
          <g transform="translate(30, 20)">
            {/* EMA Line */}
            <path d="M -10 130 Q 125 100 260 50" stroke={theme.accent} strokeWidth="4" fill="none" opacity="0.5" className="animate-draw" style={{ animationDuration: '1000ms' }} />
            <text x="5" y="140" fill={theme.accent} fontSize="10" fontWeight="bold" opacity="0.7">20 EMA</text>

            {/* Trend Candles */}
            <Candle x={0} y={90} width={15} bodyHeight={30} wickHeight={10} color={theme.bull} delay={100} />
            <Candle x={25} y={75} width={15} bodyHeight={35} wickHeight={10} color={theme.bull} delay={300} />
            
            {/* Pullback Leg 1 */}
            <Candle x={50} y={80} width={15} bodyHeight={20} wickHeight={5} color={theme.bear} delay={500} />
            
            {/* Failed Attempt / Pause */}
            <Candle x={75} y={85} width={15} bodyHeight={10} wickHeight={5} color={theme.neutral} filled={false} delay={700} />
            
            {/* Pullback Leg 2 Touching EMA */}
            <Candle x={100} y={95} width={15} bodyHeight={20} wickHeight={10} color={theme.bear} delay={900} />
            
            {/* Signal Bar bouncing off EMA */}
            <Candle x={125} y={80} width={15} bodyHeight={35} wickHeight={10} color={theme.bull} delay={1100} />
            
            {/* Entry */}
            <g className="animate-pop" style={{ animationDelay: '1300ms', opacity: 0 }}>
               <circle cx="132" cy="115" r="4" fill={theme.accent} />
               <text x="120" y="60" fill={theme.bull} fontSize="12" fontWeight="bold">A2 Buy</text>
               <path d="M 132 70 L 132 78" stroke={theme.bull} strokeWidth="2" markerEnd="url(#arrow)" />
            </g>
          </g>
        );

      case 'slp': // Second Leg Push
        return (
          <g transform="translate(20, 40)">
             {/* Leg 1 */}
             <path d="M10 120 L 60 50" stroke={theme.bull} strokeWidth="3" className="animate-draw" style={{ animationDuration: '800ms' }} />
             <text x="20" y="80" fill={theme.bull} fontSize="10" fontWeight="bold" className="animate-fade" style={{ animationDelay: '400ms' }}>Leg 1</text>
             
             {/* Pullback */}
             <path d="M60 50 L 90 80" stroke={theme.bear} strokeWidth="2" className="animate-draw" style={{ animationDelay: '800ms', animationDuration: '600ms', opacity: 0, animationFillMode: 'forwards' }} />
             
             {/* Leg 2 */}
             <path d="M90 80 L 140 10" stroke={theme.bull} strokeWidth="3" className="animate-draw" style={{ animationDelay: '1400ms', animationDuration: '800ms', opacity: 0, animationFillMode: 'forwards' }} />
             <text x="100" y="40" fill={theme.bull} fontSize="10" fontWeight="bold" className="animate-fade" style={{ animationDelay: '1800ms' }}>Leg 2</text>
             
             <line x1="10" y1="130" x2="150" y2="130" stroke={theme.gridDash} strokeWidth="1" />
          </g>
        );

      case 'mc': // Micro Channel
        return (
           <g transform="translate(40, 40)">
             <line x1="0" y1="120" x2="140" y2="20" stroke={theme.neutral} strokeWidth="20" strokeLinecap="round" opacity="0.1"/>
             {[0, 1, 2, 3, 4, 5].map(i => (
               <Candle key={i} x={i * 20} y={100 - (i * 15)} width={12} bodyHeight={25} wickHeight={5} color={theme.bull} delay={i * 150} duration={300} />
             ))}
             <text x="20" y="140" fill={theme.bull} fontSize="12" fontWeight="bold" className="animate-fade" style={{ animationDelay: '1000ms' }}>Tight Channel</text>
           </g>
        );

      case 'mm': // Measured Move
        return (
          <g transform="translate(50, 20)">
            <path d="M10 130 L 50 80" stroke={theme.neutral} strokeWidth="2" className="animate-draw" style={{ animationDuration: '800ms' }} />
            <path d="M50 80 L 70 100" stroke={theme.neutral} strokeWidth="2" className="animate-draw" style={{ animationDelay: '800ms', animationDuration: '500ms', opacity: 0, animationFillMode: 'forwards' }}/>
            <path d="M70 100 L 110 50" stroke={theme.text} strokeWidth="2" strokeDasharray="4 4" className="animate-draw" style={{ animationDelay: '1300ms', animationDuration: '800ms', opacity: 0, animationFillMode: 'forwards' }} />
            
            {/* Brackets */}
            <g className="animate-fade" style={{ animationDelay: '1000ms' }}>
                <path d="M 5 130 L 0 130 L 0 80 L 5 80" fill="none" stroke={theme.text} />
                <text x="-15" y="110" fill={theme.text} fontSize="10">A</text>
            </g>
            
            <g className="animate-fade" style={{ animationDelay: '2000ms' }}>
                <path d="M 65 100 L 60 100 L 60 50 L 65 50" fill="none" stroke={theme.text} />
                <text x="45" y="80" fill={theme.text} fontSize="10">A</text>
                <text x="120" y="60" fill={theme.bull} fontSize="12" fontWeight="bold">Target</text>
            </g>
          </g>
        );

      case 'horn': // Horn Pattern
        return (
          <g transform="translate(80, 50)">
            {/* Left Horn */}
            <g className="animate-candle" style={{ opacity: 0, animationName: 'fadeInUp', animationDelay: '200ms', animationFillMode: 'forwards' }}>
                <line x1="10" y1="20" x2="10" y2="80" stroke={theme.bear} strokeWidth="2" />
                <rect x="5" y="20" width="10" height="10" fill={theme.bear} />
            </g>
            
            {/* Middle */}
            <Candle x={25} y={30} width={10} bodyHeight={10} wickHeight={5} color={theme.neutral} filled={false} delay={600} />

            {/* Right Horn */}
            <g className="animate-candle" style={{ opacity: 0, animationName: 'fadeInUp', animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                <line x1="50" y1="20" x2="50" y2="80" stroke={theme.bear} strokeWidth="2" />
                <rect x="45" y="20" width="10" height="10" fill={theme.bear} />
            </g>

            <text x="0" y="100" fill={theme.bear} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '1200ms', opacity: 0 }}>Rejection</text>
          </g>
        );
      
      case 'ioi': // IOI
        return (
          <g transform="translate(60, 50)">
            {/* Outside */}
            <Candle x={0} y={40} width={15} bodyHeight={60} wickHeight={15} color={theme.neutral} delay={200} />
            {/* Outside */}
            <Candle x={25} y={20} width={15} bodyHeight={100} wickHeight={10} color={theme.accent} delay={600} />
            {/* Inside */}
            <Candle x={50} y={50} width={15} bodyHeight={40} wickHeight={10} color={theme.neutral} delay={1000} />
            
            <g className="animate-fade" style={{ animationDelay: '1200ms' }}>
                <path d="M 25 15 L 65 15" stroke={theme.accent} strokeWidth="1" />
                <path d="M 25 135 L 65 135" stroke={theme.accent} strokeWidth="1" />
                <text x="20" y="150" fill={theme.accent} fontSize="10">Contraction</text>
            </g>
          </g>
        );

      case 'mb': // Mother Bar
        return (
           <g transform="translate(60, 50)">
             {/* Mother */}
             <Candle x={0} y={20} width={20} bodyHeight={100} wickHeight={20} color={theme.neutral} delay={200} />
             {/* Babies */}
             <Candle x={30} y={50} width={12} bodyHeight={40} wickHeight={10} color={theme.text} delay={600} />
             <Candle x={50} y={60} width={12} bodyHeight={20} wickHeight={5} color={theme.text} delay={900} />
             <text x="0" y="160" fill={theme.neutral} fontSize="10" className="animate-fade" style={{ animationDelay: '1100ms' }}>Inside Bars</text>
           </g>
        );

      case 'midt': // Midline Test
        return (
          <g transform="translate(40, 40)">
            <rect x="0" y="0" width="160" height="120" fill={theme.grid} fillOpacity="0.5" stroke={theme.gridDash} strokeDasharray="2 2" className="animate-fade" />
            <line x1="0" y1="60" x2="160" y2="60" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" className="animate-fade" style={{ animationDelay: '500ms' }} />
            
            <path d="M10 110 L 40 20 L 80 60 L 120 10 L 150 110" fill="none" stroke={theme.neutral} strokeWidth="2" opacity="0.5" className="animate-draw" style={{ animationDelay: '200ms', animationDuration: '2000ms' }} />
            
            <g className="animate-pop" style={{ animationDelay: '1200ms', opacity: 0 }}>
                <circle cx="80" cy="60" r="5" fill="#fbbf24" />
                <text x="90" y="55" fill="#fbbf24" fontSize="10" fontWeight="bold">50% Test</text>
            </g>
          </g>
        );

      case 'pausebo': // Pause Bar
        return (
           <g transform="translate(60, 40)">
             <line x1="0" y1="60" x2="140" y2="60" stroke={theme.gridDash} strokeWidth="2" strokeDasharray="4 4" />
             {/* Breakout Candle */}
             <Candle x={20} y={30} width={20} bodyHeight={80} wickHeight={10} color={theme.bull} delay={200} />
             {/* Pause */}
             <Candle x={50} y={30} width={15} bodyHeight={5} wickHeight={5} color={theme.neutral} filled={false} delay={600} />
             {/* Continuation */}
             <Candle x={75} y={10} width={20} bodyHeight={60} wickHeight={10} color={theme.bull} delay={1000} />
             <text x="100" y="40" fill={theme.bull} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '1200ms', opacity: 0 }}>Resume</text>
           </g>
        );

      case 'sx': // Sell Climax
        return (
           <g transform="translate(60, 20)">
             <Candle x={0} y={20} width={15} bodyHeight={30} wickHeight={5} color={theme.bear} delay={100} />
             <Candle x={20} y={40} width={15} bodyHeight={40} wickHeight={5} color={theme.bear} delay={300} />
             <Candle x={40} y={70} width={15} bodyHeight={60} wickHeight={10} color={theme.bear} delay={500} />
             {/* The Climax Bar */}
             <Candle x={65} y={90} width={20} bodyHeight={80} wickHeight={15} color={theme.bear} delay={700} />
             <text x="100" y="130" fill={theme.bear} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '1000ms', opacity: 0 }}>Climax</text>
           </g>
        );

      case 'tri': // Triangle
        return (
          <g transform="translate(40, 30)">
            <g className="animate-fade" style={{ animationDelay: '1000ms' }}>
                <line x1="0" y1="20" x2="150" y2="70" stroke={theme.gridDash} strokeWidth="2" />
                <line x1="0" y1="140" x2="150" y2="70" stroke={theme.gridDash} strokeWidth="2" />
            </g>
            <path d="M10 30 L 30 130 L 60 50 L 90 100 L 110 70" fill="none" stroke={theme.text} strokeWidth="2" className="animate-draw" style={{ animationDuration: '1500ms' }} />
            
            <g className="animate-pop" style={{ animationDelay: '1600ms', opacity: 0 }}>
                <circle cx="110" cy="70" r="3" fill={theme.accent} />
                <text x="120" y="70" fill={theme.accent} fontSize="10" fontWeight="bold">Break</text>
            </g>
          </g>
        );

      case 'xt': // Expanding Triangle
        return (
          <g transform="translate(40, 30)">
            <g className="animate-fade" style={{ animationDelay: '1000ms' }}>
                <line x1="0" y1="70" x2="150" y2="20" stroke={theme.gridDash} strokeWidth="2" />
                <line x1="0" y1="90" x2="150" y2="140" stroke={theme.gridDash} strokeWidth="2" />
            </g>
            <path d="M10 80 L 40 60 L 70 110 L 100 40 L 130 130" fill="none" stroke={theme.neutral} strokeWidth="2" className="animate-draw" style={{ animationDuration: '1500ms' }} />
            <text x="110" y="80" fill={theme.neutral} fontSize="10" className="animate-fade" style={{ animationDelay: '1600ms' }}>Expansion</text>
          </g>
        );

      case 'fbo': // Failed Breakout
        return (
          <g transform="translate(50, 40)">
             <line x1="0" y1="50" x2="140" y2="50" stroke={theme.gridDash} strokeWidth="2" className="animate-fade" />
             {/* Candle poking through */}
             <g className="animate-candle" style={{ opacity: 0, animationName: 'fadeInUp', animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <line x1="70" y1="20" x2="70" y2="80" stroke={theme.bear} strokeWidth="2" />
                <rect x="62" y="55" width={16} height={25} fill={theme.bear} />
             </g>
             <text x="90" y="40" fill={theme.bear} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '800ms', opacity: 0 }}>Trap</text>
          </g>
        );
        
      case 'oioud': // OIO
        return (
          <g transform="translate(60, 40)">
             <Candle x={0} y={20} width={15} bodyHeight={80} wickHeight={10} color={theme.gridDash} filled={false} delay={200} />
             <Candle x={25} y={40} width={15} bodyHeight={40} wickHeight={5} color={theme.neutral} delay={600} />
             <Candle x={50} y={10} width={15} bodyHeight={100} wickHeight={15} color={theme.bear} delay={1000} />
             <text x="0" y="140" fill={theme.neutral} fontSize="10" className="animate-fade" style={{ animationDelay: '1200ms' }}>Choppy</text>
          </g>
        );

      case 'w1p': // Wedge 1st Pullback
        return (
           <g transform="translate(30, 20)">
             {/* Wedge Top */}
             <path d="M10 100 L 40 60 L 70 90 L 100 50 L 130 80 L 160 45" fill="none" stroke={theme.neutral} opacity="0.3" className="animate-draw" style={{ animationDuration: '1500ms' }} />
             <line x1="10" y1="40" x2="170" y2="20" stroke={theme.gridDash} strokeDasharray="4 4" className="animate-fade" />
             
             {/* Reversal Leg */}
             <path d="M160 45 L 180 120" stroke={theme.bear} strokeWidth="2" className="animate-draw" style={{ animationDelay: '1500ms', animationDuration: '400ms', opacity: 0, animationFillMode: 'forwards' }}/>
             {/* Pullback */}
             <path d="M180 120 L 200 90" stroke={theme.bull} strokeWidth="2" className="animate-draw" style={{ animationDelay: '1900ms', animationDuration: '300ms', opacity: 0, animationFillMode: 'forwards' }}/>
             
             {/* Entry */}
             <g className="animate-pop" style={{ animationDelay: '2200ms', opacity: 0 }}>
                 <circle cx="200" cy="90" r="4" fill={theme.bear} />
                 <text x="150" y="140" fill={theme.bear} fontSize="10" fontWeight="bold">Sell LH</text>
             </g>
           </g>
        );
        
      case 'wbo': // Wedge Breakout
         return (
            <g transform="translate(30, 30)">
               {/* Wedge */}
               <path d="M10 100 L 40 70 L 70 90 L 100 50" fill="none" stroke={theme.neutral} strokeWidth="2" className="animate-draw" style={{ animationDuration: '1000ms' }} />
               <line x1="0" y1="45" x2="120" y2="40" stroke={theme.gridDash} strokeWidth="2" className="animate-fade" />
               
               {/* Breakout */}
               <Candle x={105} y={20} width={15} bodyHeight={60} wickHeight={10} color={theme.bull} delay={1000} />
               <Candle x={130} y={0} width={15} bodyHeight={60} wickHeight={10} color={theme.bull} delay={1300} />
               <text x="100" y="110" fill={theme.bull} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '1500ms', opacity: 0 }}>Failed Wedge</text>
            </g>
         );
         
      case 'fh1': // Failed H1
         return (
             <g transform="translate(50, 40)">
                 {/* Trend */}
                 <Candle x={0} y={80} width={15} bodyHeight={40} wickHeight={10} color={theme.bull} delay={200} />
                 {/* H1 Signal */}
                 <Candle x={25} y={60} width={15} bodyHeight={40} wickHeight={10} color={theme.bull} delay={600} />
                 {/* Failure Bar */}
                 <Candle x={50} y={60} width={15} bodyHeight={50} wickHeight={10} color={theme.bear} delay={1000} />
                 <text x="50" y="130" fill={theme.bear} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '1300ms', opacity: 0 }}>Trap</text>
             </g>
         );
      
      case 'frev': // Failed Reversal
         return (
             <g transform="translate(50, 40)">
                 <path d="M10 20 L 40 80" stroke={theme.bear} strokeWidth="3" className="animate-draw" style={{ animationDuration: '500ms' }} />
                 <text x="10" y="15" fill={theme.bear} fontSize="10" className="animate-fade">Trend</text>
                 
                 {/* Attempt 1 */}
                 <path d="M40 80 L 60 50" stroke={theme.bull} strokeWidth="2" className="animate-draw" style={{ animationDelay: '500ms', animationDuration: '400ms', opacity: 0, animationFillMode: 'forwards' }}/>
                 <text x="50" y="45" fill={theme.bull} fontSize="8" className="animate-fade" style={{ animationDelay: '900ms' }}>Rev 1</text>
                 
                 {/* Fail */}
                 <path d="M60 50 L 80 90" stroke={theme.bear} strokeWidth="2" className="animate-draw" style={{ animationDelay: '900ms', animationDuration: '400ms', opacity: 0, animationFillMode: 'forwards' }} />
                 
                 {/* Attempt 2 */}
                 <path d="M80 90 L 100 70" stroke={theme.bull} strokeWidth="2" className="animate-draw" style={{ animationDelay: '1300ms', animationDuration: '400ms', opacity: 0, animationFillMode: 'forwards' }} />
                 <text x="90" y="65" fill={theme.bull} fontSize="8" className="animate-fade" style={{ animationDelay: '1700ms' }}>Rev 2</text>
                 
                 {/* Fail & Resume */}
                 <path d="M100 70 L 140 130" stroke={theme.bear} strokeWidth="4" className="animate-draw" style={{ animationDelay: '1700ms', animationDuration: '600ms', opacity: 0, animationFillMode: 'forwards' }} />
                 <text x="120" y="100" fill={theme.bear} fontSize="10" fontWeight="bold" className="animate-pop" style={{ animationDelay: '2300ms', opacity: 0 }}>Resume</text>
             </g>
         );

      case 'hh1': // Hard Trend H1
          return (
             <g transform="translate(40, 40)">
               <line x1="0" y1="140" x2="160" y2="20" stroke={theme.bull} strokeWidth="20" strokeLinecap="round" opacity="0.1"/>
               <Candle x={10} y={100} width={15} bodyHeight={40} wickHeight={10} color={theme.bull} delay={100} />
               <Candle x={35} y={80} width={15} bodyHeight={40} wickHeight={10} color={theme.bull} delay={300} />
               <Candle x={60} y={60} width={15} bodyHeight={40} wickHeight={10} color={theme.bull} delay={500} />
               {/* Tiny Pullback */}
               <Candle x={85} y={65} width={15} bodyHeight={15} wickHeight={5} color={theme.bear} delay={700} />
               {/* Resume */}
               <Candle x={110} y={40} width={15} bodyHeight={50} wickHeight={10} color={theme.bull} delay={900} />
               <text x="20" y="150" fill={theme.bull} fontSize="10" fontWeight="bold" className="animate-fade" style={{ animationDelay: '1200ms' }}>Strong Trend</text>
             </g>
          );

      default:
        // Generic Price Flow
        return (
            <g transform="translate(10, 50)">
                 <path d="M10 100 L 40 50 L 70 80 L 100 30 L 130 60 L 160 20" fill="none" stroke={theme.neutral} strokeWidth="2" className="animate-draw" style={{ animationDuration: '2000ms' }} />
                 <g className="animate-pop" style={{ animationDelay: '2000ms', opacity: 0 }}>
                    <circle cx="100" cy="30" r="5" fill={theme.accent} />
                    <text x="10" y="130" fill={theme.neutral} fontSize="12">Price Action Context</text>
                 </g>
            </g>
        );
    }
  };

  return (
    <div className={`w-full h-56 rounded-lg flex items-center justify-center overflow-hidden relative transition-colors duration-300 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <style>
        {`
          @keyframes draw {
            from { stroke-dashoffset: 1000; opacity: 1; }
            to { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes popIn {
            0% { opacity: 0; transform: scale(0.5); }
            70% { transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-draw {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw ease-out forwards;
          }
          .animate-candle {
            opacity: 0;
            /* Animation properties set inline for stagger */
          }
          .animate-pop {
            transform-box: fill-box;
            transform-origin: center;
            animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }
          .animate-fade {
            animation: fadeIn 0.5s ease-out forwards;
            opacity: 0;
          }
        `}
      </style>
      
      {/* Dynamic Background Grid */}
      <div className="absolute inset-0" 
           style={{ 
             backgroundImage: `linear-gradient(${isDark ? 'rgba(15,23,42,0)' : 'rgba(255,255,255,0)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(15,23,42,0)' : 'rgba(255,255,255,0)'} 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             opacity: 0.2
           }}
      ></div>
      {/* Dot Grid Overlay */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `radial-gradient(${theme.gridDash} 1px, transparent 1px)`,
             backgroundSize: '20px 20px',
             opacity: 0.2
           }}
      ></div>
      
      {/* Replay Button */}
      <button 
        onClick={replayAnimation}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors z-10"
        title="Replay Animation"
      >
        <RefreshCw className="w-4 h-4" />
      </button>

      <svg key={animationKey} width="250" height="200" viewBox="0 0 250 200">
        <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill={theme.bull} />
            </marker>
        </defs>
        {getPath(term.id)}
      </svg>
    </div>
  );
};

export default CandleVisualizer;