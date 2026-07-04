"use client";

type Contribution = {
  feature: string;
  value: number;
  healthy_range: [number, number];
  out_of_range: boolean;
  contribution_score: number;
};

const LABELS: Record<string, string> = {
  mileage_km: "Mileage",
  engine_temp_c: "Engine Temp",
  rpm: "RPM",
  vibration_level: "Vibration",
  oil_quality_pct: "Oil Quality",
  brake_pad_mm: "Brake Pad",
  battery_voltage: "Battery Voltage",
  coolant_level_pct: "Coolant Level",
  vehicle_age_years: "Vehicle Age",
};

export default function FeatureContributions({ data }: { data: Contribution[] }) {
  const max = Math.max(...data.map((d) => d.contribution_score), 0.01);
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.feature}>
          <div className="flex justify-between text-xs mb-1 opacity-80">
            <span>{LABELS[d.feature] ?? d.feature}</span>
            <span className="readout">{d.value}</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(d.contribution_score / max) * 100}%`,
                background: d.out_of_range
                  ? "linear-gradient(90deg, #C43C88, #e5486f)"
                  : "linear-gradient(90deg, #6b3550, #8f2c63)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
