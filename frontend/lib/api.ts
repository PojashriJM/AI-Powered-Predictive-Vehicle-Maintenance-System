const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8811";

export type SensorInput = {
  mileage_km: number;
  engine_temp_c: number;
  rpm: number;
  vibration_level: number;
  oil_quality_pct?: number;
  brake_pad_mm?: number;
  battery_voltage?: number;
  coolant_level_pct?: number;
};

export type PredictionResult = {
  failure_probability: number;
  risk_level: "Low" | "Moderate" | "High";
  anomaly_detected: boolean;
  anomaly_score: number;
  feature_contributions: {
    feature: string;
    value: number;
    healthy_range: [number, number];
    out_of_range: boolean;
    contribution_score: number;
  }[];
  recommendation: string;
};

export async function predictFailure(input: SensorInput): Promise<PredictionResult> {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error(`Prediction request failed: ${res.status}`);
  return res.json();
}
