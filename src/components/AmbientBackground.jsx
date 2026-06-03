// Deterministic positions — no Math.random() to avoid re-render shifts
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 23 + 7) % 88 + 5}%`,
  top:  `${(i * 31 + 11) % 82 + 6}%`,
  size: 2 + (i % 3),
  dur:  3 + (i % 5),
  delay: (i * 0.35) % 4,
}))

const BUBBLES = Array.from({ length: 12 }, (_, i) => ({
  left: `${(i * 19 + 5) % 88 + 5}%`,
  size: 8 + (i % 4) * 7,
  dur:  7 + (i % 4),
  delay: (i * 0.6) % 6,
}))

const GEOS = Array.from({ length: 9 }, (_, i) => ({
  left:  `${(i * 27 + 8) % 86 + 5}%`,
  top:   `${(i * 17 + 14) % 72 + 8}%`,
  size:  10 + (i % 4) * 9,
  dur:   5 + (i % 4),
  delay: (i * 0.45) % 3.5,
  shape: i % 3, // 0=square 1=diamond 2=circle
}))

const WAVES = [
  { bottom: 0,   dur: 7,  oMult: 0.65, path: 'M0,60 C240,10 480,110 720,60 C960,10 1200,110 1440,60 L1440,130 L0,130 Z' },
  { bottom: 20,  dur: 10, oMult: 0.45, path: 'M0,55 C200,105 440,5  720,55 C1000,105 1240,5 1440,55 L1440,130 L0,130 Z' },
  { bottom: 40,  dur: 13, oMult: 0.3,  path: 'M0,65 C300,15 540,115 720,65 C900,15 1140,115 1440,65 L1440,130 L0,130 Z' },
]

export default function AmbientBackground({ type, color1 = '#5BB8A8', color2 = '#a8e6df', intensity = 0.3 }) {
  const op = Math.min(1, Math.max(0.05, intensity))

  if (type === 'particles') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.left, top: p.top,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: i % 2 === 0 ? color1 : color2,
          opacity: op * 0.75,
          animation: `amb-float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  )

  if (type === 'blobs') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: '60%', height: '60%', borderRadius: '50%', background: color1, filter: 'blur(90px)', opacity: op * 0.55, animation: 'amb-blob1 9s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-15%', width: '65%', height: '65%', borderRadius: '50%', background: color2, filter: 'blur(100px)', opacity: op * 0.45, animation: 'amb-blob2 12s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', top: '25%', left: '25%', width: '45%', height: '45%', borderRadius: '50%', background: color1, filter: 'blur(75px)', opacity: op * 0.3, animation: 'amb-blob3 7s ease-in-out infinite alternate' }} />
    </div>
  )

  if (type === 'waves') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {WAVES.map((w, i) => (
        <svg
          key={i}
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            bottom: w.bottom,
            left: 0, right: 0,
            width: '100%',
            height: '160px',
            opacity: op * w.oMult,
            animation: `amb-wave ${w.dur}s ease-in-out ${i * 1.5}s infinite`,
          }}
        >
          <path fill={i % 2 === 0 ? color1 : color2} d={w.path} />
        </svg>
      ))}
    </div>
  )

  if (type === 'aurora') return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundSize: '300% 300%',
        background: `linear-gradient(-45deg, ${color1}88, transparent, ${color2}66, transparent, ${color1}44)`,
        opacity: op,
        animation: 'amb-aurora 10s ease infinite',
      }}
    />
  )

  if (type === 'bubbles') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {BUBBLES.map((b, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: b.left,
          bottom: '-80px',
          width: b.size,
          height: b.size,
          borderRadius: '50%',
          border: `2px solid ${i % 2 === 0 ? color1 : color2}`,
          opacity: op * 0.7,
          animation: `amb-bubble ${b.dur}s ease-in ${b.delay}s infinite`,
        }} />
      ))}
    </div>
  )

  if (type === 'geometric') return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {GEOS.map((g, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: g.left, top: g.top,
          width: g.size, height: g.size,
          border: `1.5px solid ${i % 2 === 0 ? color1 : color2}`,
          borderRadius: g.shape === 2 ? '50%' : g.shape === 1 ? '3px' : '0',
          transform: g.shape === 1 ? 'rotate(45deg)' : 'none',
          opacity: op * 0.45,
          animation: `amb-geo ${g.dur}s ease-in-out ${g.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  )

  return null
}
