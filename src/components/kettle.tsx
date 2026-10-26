import { useMemo, useState } from "react";
import { ReferenceLine, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { fill } from "@/lib/copy";
import type { Copy } from "@/lib/copy/types";
import { MathTex } from "@/components/math";

const T_MAX = 100;

function series(t0: number, k: number, horizon: number) {
  const steps = 40;
  const rows: { t: number; temp: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (horizon * i) / steps;
    const temp = T_MAX - (T_MAX - t0) * Math.exp(-k * t);
    rows.push({ t: Number(t.toFixed(2)), temp: Number(temp.toFixed(2)) });
  }
  return rows;
}

function Tip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value?: number }[];
  label?: string | number;
  unit: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-card px-3 py-2 text-sm text-ink shadow-none">
      <div className="font-mono text-xs text-muted">
        {label} {unit}
      </div>
      <div className="font-semibold tabular-nums">{payload[0].value}°C</div>
    </div>
  );
}

export function Kettle({ t }: { t: Copy }) {
  const [t0, setT0] = useState(20);
  const [k, setK] = useState(0.2);
  const [time, setTime] = useState(10);
  const s = t.sandbox;

  const gap = T_MAX - t0;
  const final = T_MAX - gap * Math.exp(-k * time);
  const rate = gap * k * Math.exp(-k * time);
  const data = useMemo(() => series(t0, k, time), [t0, k, time]);
  const kText = k.toFixed(2);
  const reading = fill(s.reading, {
    time,
    t0,
    final: final.toFixed(1),
    tmax: T_MAX,
    rate: rate.toFixed(2),
  });

  const currentTex = `T(${time}) = ${final.toFixed(2)}`;
  const speedTex = `T'(${time}) = ${rate.toFixed(2)}`;
  const modelTex = `T(t) = 100 - ${gap}e^{-${kText}t}`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-12">
      <div className="rounded-panel border border-line bg-paper-2 p-6 lg:col-span-5">
        <h3 className="font-display text-xl font-semibold text-ink">{s.controls}</h3>
        <div className="mt-6 space-y-5">
          <Slider label={s.t0} valueLabel={`${t0}°C`} min={0} max={80} step={1} value={t0} onChange={setT0} />
          <Slider
            label={s.kLabel}
            valueLabel={kText}
            min={0.05}
            max={0.5}
            step={0.01}
            value={k}
            onChange={setK}
          />
          <Slider
            label={s.time}
            valueLabel={`${time}`}
            min={1}
            max={25}
            step={1}
            value={time}
            onChange={setTime}
          />
        </div>

        <div className="mt-6 rounded-lg border border-line bg-card p-4">
          <p className="font-mono text-xs uppercase tracking-wide text-faint">{s.formulaNow}</p>
          <div className="mt-2 text-ink">
            <MathTex tex={modelTex} block />
          </div>
          <dl className="mt-3 space-y-2 border-t border-line pt-3 text-sm">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{s.now}</dt>
              <dd className="font-semibold tabular-nums text-accent">
                <MathTex tex={currentTex} /> °C
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-muted">{s.speed}</dt>
              <dd className="font-semibold tabular-nums text-ink">
                <MathTex tex={speedTex} /> {s.perMin}
              </dd>
            </div>
          </dl>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">{s.matchNote}</p>
      </div>

      <div className="rounded-panel border border-line bg-card p-6 lg:col-span-7">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl font-semibold text-ink">{s.plot}</h3>
          <span className="font-mono text-xs text-faint">°C</span>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <XAxis
                dataKey="t"
                tickFormatter={(v: number) => `${Math.round(v)}`}
                stroke="var(--color-faint)"
                tick={{ fill: "var(--color-muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}
                tickLine={false}
                axisLine={{ stroke: "var(--color-line)" }}
              />
              <YAxis
                domain={[0, 100]}
                stroke="var(--color-faint)"
                tick={{ fill: "var(--color-muted)", fontSize: 12, fontFamily: "var(--font-mono)" }}
                tickLine={false}
                axisLine={false}
                width={36}
              />
              <Tooltip
                content={<Tip unit={s.minuteShort} />}
                cursor={{ stroke: "var(--color-line-strong)" }}
              />
              <ReferenceLine y={100} stroke="var(--color-line-strong)" strokeDasharray="4 4" />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="var(--color-accent)"
                strokeWidth={2.5}
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-3 text-sm text-muted">{s.targetNote}</p>

        <div className="mt-6 border-t border-line pt-5">
          <p className="font-mono text-xs uppercase tracking-wide text-accent">{s.inWords}</p>
          <p className="mt-2 text-base leading-relaxed text-ink">{reading}</p>
        </div>
      </div>

      <div className="lg:col-span-12">
        <h3 className="font-display text-xl font-semibold text-ink">{s.keyTitle}</h3>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {s.keys.map((row) => (
            <div key={row.tex} className="flex gap-4 rounded-lg border border-line bg-card px-4 py-3">
              <dt className="w-24 shrink-0 text-ink">
                <MathTex tex={row.tex} />
              </dt>
              <dd className="text-sm leading-relaxed text-muted">{row.meaning}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function Slider({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-sm">
        <span className="text-ink">{label}</span>
        <span className="font-mono tabular-nums text-accent">{valueLabel}</span>
      </span>
      <input
        className="mt-2 h-11 w-full accent-accent"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
