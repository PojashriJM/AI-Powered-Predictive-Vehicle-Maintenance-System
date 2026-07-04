"use client";

type Props = {
  probability: number; // 0..1
  riskLevel: "Low" | "Moderate" | "High";
};

const COLORS: Record<Props["riskLevel"], string> = {
  Low: "#4fb787",
  Moderate: "#e0a63c",
  High: "#e5486f",
};

export default function RiskGauge({ probability, riskLevel }: Props) {
  const pct = Math.max(0, Math.min(1, probability));
  const angle = -90 + pct * 180; // needle sweep across a semicircle, -90deg to +90deg
  const color = COLORS[riskLevel];

  // Semicircle arc path (radius 90, centered at 100,100)
  const arcSegments = [
    { from: 0, to: 0.3, color: "#4fb787" },
    { from: 0.3, to: 0.6, color: "#e0a63c" },
    { from: 0.6, to: 1, color: "#e5486f" },
  ];

  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = ((angleDeg - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const describeArc = (from: number, to: number) => {
    const startAngle = from * 180;
    const endAngle = to * 180;
    const start = polarToCartesian(100, 100, 90, endAngle);
    const end = polarToCartesian(100, 100, 90, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${start.x} ${start.y} A 90 90 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-64 h-40">
        {arcSegments.map((seg, i) => (
          <path
            key={i}
            d={describeArc(seg.from, seg.to)}
            stroke={seg.color}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            opacity={0.85}
          />
        ))}
        {/* Needle */}
        <g style={{ transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
           transform={`rotate(${angle}, 100, 100)`}>
          <line x1="100" y1="100" x2="100" y2="28" stroke="#f6e9f0" strokeWidth={3} strokeLinecap="round" />
          <circle cx="100" cy="100" r="7" fill="#f6e9f0" />
        </g>
      </svg>
      <div className="text-center -mt-2">
        <div className="readout text-4xl font-semibold" style={{ color }}>
          {(pct * 100).toFixed(1)}%
        </div>
        <div className="text-sm uppercase tracking-widest opacity-70 mt-1">
          {riskLevel} risk
        </div>
      </div>
    </div>
  );
}
