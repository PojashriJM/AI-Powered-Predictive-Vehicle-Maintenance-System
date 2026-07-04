"use client";

import { useState } from "react";
import RiskGauge from "@/components/RiskGauge";
import FeatureContributions from "@/components/FeatureContributions";
import { predictFailure, PredictionResult, SensorInput } from "@/lib/api";

const DEFAULTS: SensorInput = {
  mileage_km: 50000,
  engine_temp_c: 90,
  rpm: 2200,
  vibration_level: 0.05,
  oil_quality_pct: 70,
  brake_pad_mm: 8,
  battery_voltage: 12.6,
  coolant_level_pct: 85,
};

const FIELDS: { key: keyof SensorInput; label: string; unit: string; step: number }[] = [
  { key: "mileage_km", label: "Mileage", unit: "km", step: 1000 },
  { key: "engine_temp_c", label: "Engine Temperature", unit: "°C", step: 1 },
  { key: "rpm", label: "RPM", unit: "rpm", step: 50 },
  { key: "vibration_level", label: "Vibration Level", unit: "g", step: 0.01 },
  { key: "oil_quality_pct", label: "Oil Quality", unit: "%", step: 1 },
  { key: "brake_pad_mm", label: "Brake Pad Thickness", unit: "mm", step: 0.5 },
  { key: "battery_voltage", label: "Battery Voltage", unit: "V", step: 0.1 },
  { key: "coolant_level_pct", label: "Coolant Level", unit: "%", step: 1 },
];

export default function Home() {
  const [values, setValues] = useState<SensorInput>(DEFAULTS);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (key: keyof SensorInput, val: number) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await predictFailure(values);
      setResult(res);
    } catch (e) {
      setError("Couldn't reach the prediction service. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 md:px-16">
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2">
          Predictive Maintenance
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold">
          AutoGuard
        </h1>
        <p className="opacity-70 mt-2 max-w-xl">
          Enter live sensor readings to estimate failure risk, spot anomalies,
          and get a targeted maintenance recommendation — backed by a trained
          ML model, not a lookup table.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sensor input panel */}
        <section className="glass-panel rounded-2xl p-6 md:p-8">
          <h2 className="text-lg font-medium mb-6">Sensor Readings</h2>
          <div className="space-y-5">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="text-sm opacity-80 flex justify-between mb-1.5">
                  <span>{f.label}</span>
                  <span className="readout text-accent">
                    {values[f.key]} {f.unit}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={
                    f.key === "mileage_km" ? 300000 :
                    f.key === "rpm" ? 7000 :
                    f.key === "engine_temp_c" ? 140 :
                    f.key === "vibration_level" ? 1 :
                    f.key === "battery_voltage" ? 15 : 100
                  }
                  step={f.step}
                  value={values[f.key]}
                  onChange={(e) => update(f.key, parseFloat(e.target.value))}
                  className="w-full accent-accent"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-8 w-full bg-accent hover:bg-accentDim transition-colors rounded-xl py-3 font-medium disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Predict Failure Risk"}
          </button>
          {error && <p className="text-danger text-sm mt-3">{error}</p>}
        </section>

        {/* Results panel */}
        <section className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col">
          <h2 className="text-lg font-medium mb-4">Prediction</h2>
          {!result ? (
            <div className="flex-1 flex items-center justify-center text-center opacity-50 text-sm">
              Run a prediction to see the risk gauge and diagnosis.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="flex justify-center">
                <RiskGauge
                  probability={result.failure_probability}
                  riskLevel={result.risk_level}
                />
              </div>

              {result.anomaly_detected && (
                <div className="bg-warn/10 border border-warn/30 rounded-xl px-4 py-2 text-sm text-warn">
                  Anomaly detected — this sensor pattern is unusual compared to typical healthy vehicles.
                </div>
              )}

              <div>
                <h3 className="text-sm uppercase tracking-wider opacity-60 mb-3">
                  Contributing Factors
                </h3>
                <FeatureContributions data={result.feature_contributions} />
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <p className="text-sm">
                  <span className="text-accent font-medium">Recommendation: </span>
                  {result.recommendation}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="mt-12 text-xs opacity-40 text-center">
        AutoGuard — AI-Powered Predictive Vehicle Maintenance · Poja Shri J M
      </footer>
    </main>
  );
}
