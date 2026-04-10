import React, { useState } from 'react';
import { RF_IMPORTANCE, WATERFALL_PATIENT, RISK_CATEGORIES } from '../data.js';

const C = {
    card: '#FFFFFF', red: '#E8323A', redDim: '#FDECEA', primary: '#1A1A2E',
    secondary: '#6B7280', muted: '#9CA3AF', border: '#E5E7EB', success: '#10B981', blue: '#3B82F6',
};
const Card = ({ children, style = {} }) => (
    <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', ...style }}>{children}</div>
);

function lerpColor(t) {
    // t: 0=blue, 0.5=white, 1=red
    if (t > 0.5) {
        const r = Math.round(255 * (t - 0.5) * 2);
        const g = Math.round(255 * (1 - (t - 0.5) * 2));
        return `rgb(${Math.min(232, r + 100)},${g},${Math.max(58, 58)})`;
    }
    return `rgb(${Math.round(59 + t * 2 * 196)},${Math.round(130 + t * 2 * (-130 + 100))},${Math.round(246 + (t * 2) * (58 - 246))})`;
}

const SHAP_ROWS = [
    { feature: "age", dots: [3.2, 3.8, 4.1, 4.5, 4.9, 5.1, 5.3, 3.1, 4.2, 3.5, 4.8, 5.0, 2.9, 4.4, 3.7, 5.2, 4.6, 3.3, 4.0, 2.8, 3.9, 4.7, 5.4, 3.6, 4.3, 2.7, 5.5, 3.0, 4.1, 3.8], vals: [0.9, 0.85, 0.8, 0.95, 1, 0.88, 0.92, 0.7, 0.82, 0.78, 0.96, 0.91, 0.65, 0.87, 0.75, 0.93, 0.89, 0.72, 0.84, 0.6, 0.83, 0.9, 0.97, 0.77, 0.86, 0.55, 0.98, 0.68, 0.81, 0.79] },
    { feature: "avg_glucose_level", dots: [2.5, 3.2, 4.0, 3.7, 2.9, 1.8, 4.3, 3.5, 2.2, 3.9, 1.5, 4.1, 3.1, 2.7, 4.4, 3.3, 1.9, 3.6, 2.4, 4.2, 3.0, 2.6, 1.7, 3.8, 2.1, 4.5, 3.4, 2.3, 1.6, 4.0], vals: [0.9, 0.85, 0.95, 0.8, 0.7, 0.6, 0.98, 0.82, 0.55, 0.88, 0.45, 0.92, 0.78, 0.65, 0.96, 0.79, 0.62, 0.84, 0.58, 0.91, 0.74, 0.67, 0.52, 0.87, 0.56, 0.99, 0.81, 0.59, 0.48, 0.93] },
    { feature: "bmi", dots: [-1.5, 1.2, -0.8, 2.1, 0.5, -1.1, 2.8, 1.6, -0.3, 2.4, 0.9, -0.6, 1.8, -1.8, 2.2, 0.3, -1.3, 1.4, -0.1, 2.6, 0.7, -0.9, 1.1, 2.9, -0.5, 1.7, -1.0, 2.3, 0.4, -0.7], vals: [0.3, 0.7, 0.4, 0.8, 0.55, 0.35, 0.95, 0.72, 0.5, 0.88, 0.62, 0.42, 0.78, 0.25, 0.82, 0.52, 0.32, 0.68, 0.48, 0.92, 0.58, 0.38, 0.65, 0.96, 0.45, 0.75, 0.36, 0.85, 0.53, 0.4] },
    { feature: "gender_Male", dots: [-2.1, -1.5, -2.4, -1.8, -0.9, -2.7, -1.2, -2.0, -0.6, -2.3, -1.6, -0.8, -2.5, -1.9, -0.5, -2.2, -1.1, -2.6, -1.4, -0.7, -2.0, -1.7, -0.4, -2.8, -1.3, -2.1, -0.9, -1.5, -2.3, -0.6], vals: [0.4, 0.45, 0.35, 0.42, 0.5, 0.3, 0.48, 0.38, 0.55, 0.33, 0.43, 0.52, 0.32, 0.39, 0.58, 0.36, 0.5, 0.31, 0.46, 0.54, 0.4, 0.44, 0.6, 0.29, 0.47, 0.37, 0.51, 0.44, 0.34, 0.57] },
    { feature: "hypertension", dots: [0.5, 1.2, 0.8, 1.5, 0.3, 1.9, 0.6, 1.1, 0.2, 1.7, 0.4, 1.3, 0.9, 0.1, 1.6, 0.7, 1.8, 0.3, 1.0, 0.5, 1.4, 0.8, 2.0, 0.2, 1.2, 0.6, 1.9, 0.4, 1.1, 0.7], vals: [0.3, 0.7, 0.5, 0.9, 0.2, 1, 0.4, 0.65, 0.15, 0.95, 0.25, 0.75, 0.55, 0.1, 0.9, 0.45, 0.97, 0.2, 0.6, 0.35, 0.82, 0.5, 1, 0.12, 0.72, 0.4, 0.98, 0.28, 0.67, 0.45] },
    { feature: "heart_disease", dots: [0.3, 0.9, 1.4, 0.6, 0.1, 1.7, 0.5, 1.1, 0.2, 1.5, 0.7, 0.4, 1.2, 0.8, 0.0, 1.8, 0.3, 1.0, 0.6, 1.3, 0.2, 0.8, 1.6, 0.4, 0.9, 1.1, 0.5, 1.4, 0.7, 0.3], vals: [0.2, 0.55, 0.8, 0.4, 0.05, 0.95, 0.3, 0.65, 0.1, 0.85, 0.45, 0.25, 0.72, 0.5, 0, 1, 0.2, 0.6, 0.38, 0.78, 0.12, 0.5, 0.9, 0.28, 0.55, 0.65, 0.35, 0.82, 0.45, 0.2] },
    { feature: "ever_married_Yes", dots: [-1.2, -0.5, -1.8, -0.8, -1.5, 0.2, -0.3, -1.0, -0.7, -1.3, -0.2, -1.6, -0.9, -0.4, -1.1, 0.1, -1.4, -0.6, -1.9, -0.1, -0.8, -1.2, -0.5, -1.7, -0.3, -1.0, 0.0, -1.5, -0.7, -1.2], vals: [0.45, 0.52, 0.38, 0.49, 0.41, 0.58, 0.55, 0.47, 0.5, 0.43, 0.56, 0.4, 0.48, 0.53, 0.46, 0.57, 0.42, 0.51, 0.37, 0.55, 0.5, 0.44, 0.54, 0.39, 0.56, 0.47, 0.58, 0.41, 0.5, 0.44] },
    { feature: "work_type_Private", dots: [-0.8, 0.3, -0.4, 0.6, -0.2, 0.9, -0.6, 0.2, -0.1, 0.5, -0.7, 0.1, -0.3, 0.7, -0.5, 0.4, -0.9, 0.0, 0.3, -0.6, 0.8, -0.2, 0.5, -0.4, 0.1, 0.6, -0.7, 0.2, 0.4, -0.3], vals: [0.4, 0.55, 0.45, 0.6, 0.5, 0.65, 0.42, 0.53, 0.51, 0.58, 0.41, 0.52, 0.46, 0.62, 0.44, 0.57, 0.38, 0.5, 0.55, 0.43, 0.63, 0.49, 0.59, 0.45, 0.52, 0.61, 0.4, 0.54, 0.57, 0.46] },
];

function SHAPBeeswarm() {
    const W = 520, rowH = 32, pad = { left: 170, right: 20, top: 20 };
    const range = 6;
    function xPos(v) { return pad.left + ((v + range) / (range * 2)) * (W - pad.left - pad.right); }
    const zeroX = pad.left + (range / (range * 2)) * (W - pad.left - pad.right);

    return (
        <div style={{ overflowX: 'auto' }}>
            <svg viewBox={`0 0 ${W} ${SHAP_ROWS.length * rowH + pad.top + 30}`} style={{ width: '100%', minWidth: 400 }}>
                {/* axes */}
                {[-6, -4, -2, 0, 2, 4, 6].map(v => (
                    <g key={v}>
                        <line x1={xPos(v)} y1={pad.top} x2={xPos(v)} y2={SHAP_ROWS.length * rowH + pad.top} stroke="#F3F4F6" strokeWidth={1} />
                        <text x={xPos(v)} y={SHAP_ROWS.length * rowH + pad.top + 14} textAnchor="middle" fontSize={9} fill={C.muted}>{v}</text>
                    </g>
                ))}
                <line x1={zeroX} y1={pad.top} x2={zeroX} y2={SHAP_ROWS.length * rowH + pad.top} stroke={C.border} strokeWidth={1.5} />
                <text x={W / 2} y={SHAP_ROWS.length * rowH + pad.top + 26} textAnchor="middle" fontSize={10} fill={C.secondary}>SHAP Value</text>

                {SHAP_ROWS.map((row, ri) => {
                    const cy = pad.top + ri * rowH + rowH / 2;
                    return (
                        <g key={row.feature}>
                            <text x={pad.left - 8} y={cy + 4} textAnchor="end" fontSize={10} fill={C.primary}>{row.feature}</text>
                            {row.dots.map((x, i) => {
                                const t = row.vals[i] ?? 0.5;
                                const r = t > 0.5 ? Math.round(232 * (2 * (t - 0.5))) : Math.round(59 + 140 * (2 * t));
                                const g = Math.round(130 * (1 - Math.abs(t - 0.5) * 2));
                                const b = t < 0.5 ? Math.round(246 * (1 - 2 * t) + 58 * 2 * t) : Math.round(58 * (1 - 2 * (t - 0.5)));
                                return <circle key={i} cx={xPos(x) + (Math.random() - 0.5) * 4} cy={cy + (Math.random() - 0.5) * 8} r={3.5} fill={`rgb(${r},${g},${b})`} opacity={0.75} />;
                            })}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function WaterfallChart() {
    const { baseline, contributions } = WATERFALL_PATIENT;
    const maxAbs = Math.max(...contributions.map(c => Math.abs(c.shap)));
    let running = baseline;
    const bars = contributions.map(c => {
        const start = running;
        running += c.shap;
        return { ...c, start, end: running };
    });

    return (
        <div style={{ overflowX: 'auto' }}>
            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: C.secondary, marginBottom: 12 }}>
                Patient #61 — True Positive | E[f(x)]={baseline} → f(x)=3.072
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {bars.map(({ feature, shap, direction }) => {
                    const pct = Math.abs(shap) / maxAbs * 100;
                    const isUp = direction === 'up';
                    return (
                        <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 200, fontSize: 11, color: C.primary, textAlign: 'right', flexShrink: 0 }}>{feature}</div>
                            <div style={{ flex: 1, position: 'relative', height: 20, background: '#F9FAFB', borderRadius: 4, overflow: 'hidden' }}>
                                <div style={{
                                    position: 'absolute', [isUp ? 'left' : 'right']: 0,
                                    width: `${pct}%`, height: '100%',
                                    background: isUp ? C.red : C.blue,
                                    opacity: 0.8, borderRadius: 4,
                                }} />
                            </div>
                            <div style={{
                                width: 50, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11,
                                color: isUp ? C.red : C.blue, fontWeight: 700, textAlign: 'right', flexShrink: 0
                            }}>
                                {isUp ? '+' : ''}{shap.toFixed(2)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function DonutChart({ data }) {
    const total = Object.values(data).reduce((s, v) => s + v.pct, 0);
    let cumAngle = -90;
    const cx = 90, cy = 90, r = 70, thick = 22;
    const segments = Object.entries(data).map(([name, v]) => {
        const angle = (v.pct / total) * 360;
        const startA = cumAngle; cumAngle += angle;
        return { name, ...v, startA, angle };
    });

    function polarToXY(angle, radius) {
        const rad = (angle * Math.PI) / 180;
        return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
    }
    function arcPath(startA, angle, R) {
        const [x1, y1] = polarToXY(startA, R);
        const [x2, y2] = polarToXY(startA + angle - 0.5, R);
        const large = angle > 180 ? 1 : 0;
        return `M${x1},${y1} A${R},${R} 0 ${large},1 ${x2},${y2}`;
    }

    return (
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <svg width={180} height={180}>
                {segments.map(seg => (
                    <path key={seg.name} d={arcPath(seg.startA, seg.angle, r)} fill="none"
                        stroke={seg.color} strokeWidth={thick} strokeLinecap="round" />
                ))}
                <text x={cx} y={cy - 6} textAnchor="middle" fontSize={10} fill={C.secondary}>SHAP</text>
                <text x={cx} y={cy + 8} textAnchor="middle" fontSize={10} fill={C.secondary}>Drivers</text>
            </svg>
            <div style={{ flex: 1 }}>
                {segments.map(seg => (
                    <div key={seg.name} style={{ marginBottom: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: seg.color, display: 'inline-block' }} />
                                <span style={{ fontWeight: 700, fontSize: 13, color: C.primary }}>{seg.name}</span>
                            </span>
                            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, fontWeight: 700, color: seg.color }}>{seg.pct}%</span>
                        </div>
                        <div style={{ fontSize: 11, color: C.secondary }}>{seg.features.join(', ')}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function FeatureTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* RF Importance */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>Random Forest — Gini Importance</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {RF_IMPORTANCE.map((f, i) => (
                        <div key={f.feature} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ width: 210, fontSize: 11, color: i < 3 ? C.primary : C.secondary, fontWeight: i < 3 ? 700 : 400, textAlign: 'right', flexShrink: 0 }}>{f.feature}</div>
                            <div style={{ flex: 1, height: 18, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                <div style={{
                                    width: `${(f.importance / 0.298) * 100}%`, height: '100%',
                                    background: `linear-gradient(90deg, ${C.red}, #FCA5A5)`,
                                    borderRadius: 4, transition: 'width 0.8s ease'
                                }} />
                                {i < 3 && <div style={{ position: 'absolute', right: 4, top: 2, fontSize: 10, color: '#fff', fontWeight: 700 }}>★</div>}
                            </div>
                            <div style={{ width: 46, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: C.secondary, flexShrink: 0 }}>
                                {f.importance.toFixed(3)}
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: 8, fontSize: 12, color: C.muted }}>
                    Mean importance: 0.0667 | Top 3 features account for 74.2% of total importance
                </div>
            </Card>

            {/* SHAP Beeswarm */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 4 }}>SHAP Summary — Beeswarm Visualization</h3>
                <p style={{ fontSize: 13, color: C.secondary, marginBottom: 16 }}>Red dots = high feature value, Blue dots = low feature value. Position on x-axis = SHAP impact on prediction.</p>
                <SHAPBeeswarm />
            </Card>

            {/* SHAP Waterfall */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>SHAP Waterfall — Patient #61 (True Positive)</h3>
                <WaterfallChart />
                <div style={{ marginTop: 16, padding: 12, background: '#F0FDF4', borderRadius: 8, borderLeft: `4px solid ${C.success}`, fontSize: 13 }}>
                    <strong style={{ color: C.success }}>Confirmed Stroke Patient:</strong> High glucose and smoking status are the dominant drivers, collectively contributing +2.0 log-odds
                    above baseline.
                </div>
            </Card>

            {/* Risk Categories */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>Risk Factor Category Breakdown</h3>
                <DonutChart data={RISK_CATEGORIES} />
                <div style={{ borderLeft: `4px solid ${C.red}`, background: C.redDim, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginTop: 20 }}>
                    <p style={{ fontSize: 13, color: C.primary, margin: 0 }}>
                        Demographic factors (age, gender) contribute <strong>42.1%</strong> of total SHAP — non-modifiable. However, Clinical + Lifestyle factors together
                        account for <strong>57.9%</strong>, confirming the model captures actionable prevention targets.
                    </p>
                </div>
            </Card>
        </div>
    );
}
