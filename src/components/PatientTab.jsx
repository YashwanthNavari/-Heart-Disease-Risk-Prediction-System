import React, { useState, useEffect, useRef } from 'react';
import { computeStrokeRisk, DIGIT_BITMAPS } from '../data.js';

const C = {
    card: '#FFFFFF', red: '#E8323A', redDim: '#FDECEA', primary: '#1A1A2E',
    secondary: '#6B7280', muted: '#9CA3AF', border: '#E5E7EB', success: '#10B981', blue: '#3B82F6',
};
const Card = ({ children, style = {} }) => (
    <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', ...style }}>{children}</div>
);

const DEFAULTS = {
    age: 67, bmi: 29, glucose: 230, gender: 'Male', hypertension: true,
    heartDisease: true, married: true, residence: 'Urban',
    workType: 'Private', smoking: 'Formerly Smoked',
};

function DotMatrixDigit({ char, color, size = 8, gap = 3 }) {
    const bitmap = DIGIT_BITMAPS[char];
    if (!bitmap) return null;
    const cols = 5, rows = 7;
    return (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},${size}px)`, gap: `${gap}px` }}>
            {bitmap.map((on, i) => (
                <div key={i} style={{ width: size, height: size, borderRadius: '50%', background: on ? color : '#E5E7EB', transition: 'background 0.3s' }} />
            ))}
        </div>
    );
}

function DotMatrixDisplay({ value, color }) {
    const [displayed, setDisplayed] = useState(0);
    const targetRef = useRef(value);
    targetRef.current = value;

    useEffect(() => {
        const start = performance.now();
        const startVal = 0;
        function frame(now) {
            const t = Math.min((now - start) / 1500, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setDisplayed(Math.round(startVal + ease * (targetRef.current - startVal)));
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }, [value]);

    const str = `${displayed}%`;
    return (
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
            {str.split('').map((ch, i) => (
                <DotMatrixDigit key={i} char={ch} color={color} size={9} gap={3} />
            ))}
        </div>
    );
}

const SliderField = ({ label, name, min, max, value, onChange, unit = '' }) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: C.secondary, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</label>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 14, fontWeight: 700, color: C.primary }}>{value}{unit}</span>
        </div>
        <input type="range" min={min} max={max} value={value}
            onChange={e => onChange(name, +e.target.value)}
            style={{ width: '100%', accentColor: C.red, cursor: 'pointer' }} />
    </div>
);

const ToggleField = ({ label, name, value, onChange }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: C.secondary, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</label>
        <div onClick={() => onChange(name, !value)} style={{
            width: 46, height: 24, borderRadius: 12, background: value ? C.red : C.border,
            position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
        }}>
            <div style={{
                position: 'absolute', top: 3, left: value ? 22 : 3, width: 18, height: 18,
                borderRadius: '50%', background: '#fff', transition: 'left 0.2s',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }} />
        </div>
    </div>
);

const RadioField = ({ label, name, value, options, onChange }) => (
    <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: C.secondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>{label}</label>
        <div style={{ display: 'flex', gap: 8 }}>
            {options.map(opt => (
                <button key={opt} onClick={() => onChange(name, opt)} style={{
                    padding: '6px 14px', borderRadius: 20, border: `1.5px solid ${value === opt ? C.red : C.border}`,
                    background: value === opt ? C.redDim : '#fff', color: value === opt ? C.red : C.secondary,
                    fontWeight: 600, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s',
                }}>{opt}</button>
            ))}
        </div>
    </div>
);

const SelectField = ({ label, name, value, options, onChange }) => (
    <div>
        <label style={{ fontSize: 12, fontWeight: 600, color: C.secondary, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 8 }}>{label}</label>
        <select value={value} onChange={e => onChange(name, e.target.value)} style={{
            width: '100%', padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${C.border}`,
            fontSize: 13, color: C.primary, background: '#fff', cursor: 'pointer',
            outline: 'none',
        }}>
            {options.map(o => <option key={o}>{o}</option>)}
        </select>
    </div>
);

export default function PatientTab() {
    const [inputs, setInputs] = useState(DEFAULTS);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleChange(name, val) {
        setInputs(prev => ({ ...prev, [name]: val }));
        setResult(null);
    }

    function analyze() {
        setLoading(true);
        setTimeout(() => {
            const r = computeStrokeRisk(inputs);
            setResult(r);
            setLoading(false);
        }, 900);
    }

    const isHigh = result?.prediction === 'HIGH RISK';
    const riskPct = result ? Math.round(result.probability * 100) : null;
    const riskColor = isHigh ? C.red : C.success;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 20 }}>Patient Risk Profile</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <SliderField label="Age" name="age" min={18} max={90} value={inputs.age} onChange={handleChange} />
                    <SliderField label="BMI" name="bmi" min={10} max={60} value={inputs.bmi} onChange={handleChange} />
                    <SliderField label="Avg Glucose Level" name="glucose" min={50} max={300} value={inputs.glucose} onChange={handleChange} unit=" mg/dL" />
                    <RadioField label="Gender" name="gender" value={inputs.gender} options={['Male', 'Female']} onChange={handleChange} />
                    <ToggleField label="Hypertension" name="hypertension" value={inputs.hypertension} onChange={handleChange} />
                    <ToggleField label="Heart Disease" name="heartDisease" value={inputs.heartDisease} onChange={handleChange} />
                    <ToggleField label="Ever Married" name="married" value={inputs.married} onChange={handleChange} />
                    <RadioField label="Residence Type" name="residence" value={inputs.residence} options={['Urban', 'Rural']} onChange={handleChange} />
                    <SelectField label="Work Type" name="workType" value={inputs.workType}
                        options={['Private', 'Self-employed', 'Govt', 'Children', 'Never worked']} onChange={handleChange} />
                    <SelectField label="Smoking Status" name="smoking" value={inputs.smoking}
                        options={['Never Smoked', 'Formerly Smoked', 'Smokes', 'Unknown']} onChange={handleChange} />
                </div>
                <button onClick={analyze} disabled={loading} style={{
                    width: '100%', marginTop: 24, padding: '16px', borderRadius: 12,
                    background: loading ? '#9CA3AF' : C.red, color: '#fff', border: 'none',
                    fontFamily: "'IBM Plex Mono',monospace", fontWeight: 700, fontSize: 15, letterSpacing: 2,
                    textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s', boxShadow: loading ? 'none' : `0 4px 20px ${C.red}44`,
                }}>
                    {loading ? '⟳  ANALYZING...' : '⬤  ANALYZE RISK'}
                </button>
            </Card>

            {result && (
                <div style={{ animation: 'fadeUp 0.35s ease both' }}>
                    {/* Score Card */}
                    <Card style={{ marginBottom: 24, background: isHigh ? `linear-gradient(135deg, #FFF5F5, ${C.redDim})` : 'linear-gradient(135deg, #F0FDF4, #ECFDF5)', border: `2px solid ${riskColor}` }}>
                        <div style={{ textAlign: 'center', padding: '8px 0' }}>
                            <div style={{ display: 'inline-block', padding: '4px 16px', borderRadius: 20, background: riskColor, color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: 2, marginBottom: 16 }}>
                                {result.prediction}
                            </div>
                            <div style={{ marginBottom: 12 }}>
                                <DotMatrixDisplay value={riskPct} color={riskColor} />
                            </div>
                            <div style={{ fontSize: 13, color: C.secondary, fontWeight: 600 }}>Stroke Risk Probability</div>
                            <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>Clinical threshold: 0.28 | Optimized for recall (sensitivity)</div>
                            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: C.muted, marginTop: 8 }}>
                                log-odds = {result.logOdds.toFixed(3)} | p = {result.probability.toFixed(4)}
                            </div>
                        </div>
                    </Card>

                    {/* Feature Contributions */}
                    <Card style={{ marginBottom: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: C.primary, marginBottom: 16 }}>Feature Contribution Breakdown</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {result.contributions.map(({ feature, value, contribution }, i) => {
                                const isPos = contribution >= 0;
                                const maxC = Math.max(...result.contributions.map(c => Math.abs(c.contribution)));
                                const pct = Math.abs(contribution) / maxC * 100;
                                return (
                                    <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 10, animation: `barGrow 0.6s ${i * 0.05}s ease both` }}>
                                        <div style={{ width: 120, fontSize: 12, color: C.primary, fontWeight: 600, flexShrink: 0 }}>{feature}</div>
                                        <div style={{ width: 80, fontSize: 11, color: C.muted, flexShrink: 0, fontFamily: "'IBM Plex Mono',monospace" }}>
                                            {typeof value === 'number' ? value.toFixed(0) : value}
                                        </div>
                                        <div style={{ flex: 1, height: 18, background: '#F9FAFB', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                            <div style={{ position: 'absolute', [isPos ? 'left' : 'right']: 0, width: `${pct}%`, height: '100%', background: isPos ? C.red : C.blue, borderRadius: 4, opacity: 0.8 }} />
                                        </div>
                                        <div style={{ width: 55, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: isPos ? C.red : C.blue, fontWeight: 700, textAlign: 'right', flexShrink: 0 }}>
                                            {isPos ? '+' : ''}{contribution.toFixed(3)}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Clinical Recommendation */}
                    <Card style={{ borderLeft: `4px solid ${riskColor}`, paddingLeft: 20 }}>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: riskColor, marginBottom: 8 }}>
                            {isHigh ? '⚠ Clinical Recommendation' : '✓ Risk Assessment'}
                        </h4>
                        <p style={{ fontSize: 13, color: C.primary, lineHeight: 1.7, margin: 0 }}>
                            {isHigh
                                ? `Recommend immediate clinical assessment. Key risk drivers: ${result.contributions.filter(c => c.contribution > 0).slice(0, 2).map(c => c.feature).join(', ')}. Consider cardiovascular workup, glucose management, and blood pressure monitoring.`
                                : `Current profile suggests lower stroke risk. Primary risk factor to monitor: ${result.contributions[0].feature}. Annual screening recommended for ongoing vigilance.`}
                        </p>
                        <div style={{ marginTop: 16, padding: 12, background: '#F9FAFB', borderRadius: 8, fontSize: 11, color: C.muted, lineHeight: 1.6 }}>
                            Prediction uses Logistic Regression (AUC-ROC: 0.818) — best-performing model from 7-classifier study.
                            Decision threshold lowered to 0.28 to prioritize recall (sensitivity), minimizing missed stroke cases.
                            This tool supports clinical decision-making and does not replace physician assessment.
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
}
