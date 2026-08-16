import { Check } from "lucide-react";

interface ProgressRingProps {
  packed: number;
  total: number;
  size?: number;
}

export function ProgressRing({ packed, total, size = 40 }: ProgressRingProps) {
  const fraction = total === 0 ? 0 : packed / total;
  const complete = total > 0 && packed === total;
  const radius = (size - 5) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fraction);

  return (
    <div className="day-card__ring" style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={complete ? "var(--color-green)" : "var(--color-red)"}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {complete ? (
          <Check size={16} strokeWidth={3} color="var(--color-green)" />
        ) : (
          <span style={{ fontSize: 10.5, fontWeight: 700, color: "var(--color-text-secondary)" }}>
            {packed}/{total}
          </span>
        )}
      </div>
    </div>
  );
}
