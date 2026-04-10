import React, { useState, useRef, useEffect } from 'react';
import { MODEL_RESULTS, ROC_DATA, CONFUSION_MATRICES } from '../data.js';

const C = {
    card: '#FFFFFF', red: '#E8323A', redDim: '#FDECEA', primary: '#1A1A2E',
    secondary: '#6B7280', muted: '#9CA3AF', border: '#E5E7EB', success: '#10B981', blue: '#3B82F6',
};
const Card = ({ children, style = {} }) => (
    <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', ...style }}>{children}</div>
);
const Callout = ({ children }) => (
    <div style={{ borderLeft: `4px solid ${C.red}`, background: C.redDim, borderRadius: '0 8px 8px 0', padding: '12px 16px', marginTop: 12 }}>
        {children}
    </div>
);

const sorted = [...MODEL_RESULTS].sort((a, b) => b.auc - a.auc);
const bests = {
    accuracy: Math.max(...MODEL_RESULTS.map(m => m.accuracy)), precision: Math.max(...MODEL_RESULTS.map(m => m.precision)),
    recall: Math.max(...MODEL_RESULTS.map(m => m.recall)), f1: Math.max(...MODEL_RESULTS.map(m => m.f1)),
    auc: Math.max(...MODEL_RESULTS.map(m => m.auc)), specificity: Math.max(...MODEL_RESULTS.map(m => m.specificity)),
    kappa: Math.max(...MODEL_RESULTS.map(m => m.kappa)), cvAuc: Math.max(...MODEL_RESULTS.map(m => m.cvAuc))
};

function MiniBar({ value, max = 1, color }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ flex: 1, height: 6, background: '#F3F4F6', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${(value / max) * 100}%`, height: '100%', background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: C.secondary, minWidth: 38 }}>{value.toFixed(3)}</span>
        </div>
    );
}

function ROCChart({ hoveredModel, setHoveredModel }) {
    const W = 500, H = 380, pad = 50;
    const chartW = W - pad * 2, chartH = H - pad * 2;
    function toXY(fpr, tpr) { return [pad + fpr * chartW, pad + (1 - tpr) * chartH]; }

    function rocPath(auc) {
        const pts = [];
        for (let i = 0; i <= 20; i++) {
            const fpr = i / 20;
            const tpr = Math.pow(fpr, (1 - auc) / auc);
            pts.push([fpr, tpr]);
        }
        return pts;
    }

    return (
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 540 }}>
            {/* grid */}
            {[0, 0.2, 0.4, 0.6, 0.8, 1].map(v => (
                <g key={v}>
                    <line x1={pad + v * chartW} y1={pad} x2={pad + v * chartW} y2={pad + chartH} stroke="#F3F4F6" strokeWidth={1} />
                    <line x1={pad} y1={pad + (1 - v) * chartH} x2={pad + chartW} y2={pad + (1 - v) * chartH} stroke="#F3F4F6" strokeWidth={1} />
                    <text x={pad + v * chartW} y={pad + chartH + 16} textAnchor="middle" fontSize={9} fill={C.muted}>{v.toFixed(1)}</text>
                    <text x={pad - 8} y={pad + (1 - v) * chartH + 4} textAnchor="end" fontSize={9} fill={C.muted}>{v.toFixed(1)}</text>
                </g>
            ))}
            <text x={pad + chartW / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={C.secondary}>False Positive Rate</text>
            <text x={12} y={pad + chartH / 2} textAnchor="middle" fontSize={11} fill={C.secondary} transform={`rotate(-90,12,${pad + chartH / 2})`}>True Positive Rate</text>

            {/* baseline */}
            <line x1={pad} y1={pad + chartH} x2={pad + chartW} y2={pad} stroke="#D1D5DB" strokeWidth={1} strokeDasharray="4,4" />

            {/* curves */}
            {ROC_DATA.filter(d => !d.dashed).map(model => {
                const pts = rocPath(model.auc);
                const d = pts.map((p, i) => {
                    const [x, y] = toXY(p[0], p[1]);
                    return (i === 0 ? `M${x},${y}` : `L${x},${y}`);
                }).join(' ');
                const hovered = hoveredModel === model.name;
                const anyHovered = !!hoveredModel;
                return (
                    <path key={model.name} d={d} fill="none" stroke={model.color}
                        strokeWidth={model.thick ? 3 : 1.5}
                        opacity={anyHovered ? (hovered ? 1 : 0.15) : 1}
                        style={{ transition: 'opacity 0.2s ease' }} />
                );
            })}

            {/* legend */}
            {ROC_DATA.map((model, i) => (
                <g key={model.name} style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredModel(model.name)}
                    onMouseLeave={() => setHoveredModel(null)}>
                    <rect x={W - 130} y={pad + i * 20} width={10} height={3} rx={2} fill={model.color} />
                    <text x={W - 116} y={pad + i * 20 + 5} fontSize={9} fill={hoveredModel === model.name ? C.primary : C.secondary}>
                        {model.name} ({model.auc.toFixed(3)})
                    </text>
                </g>
            ))}
        </svg>
    );
}

function ConfusionMatrix({ name, matrix }) {
    const { tn, fp, fn, tp } = matrix;
    const cells = [
        { label: 'TN', value: tn, note: '✓ Healthy patient correctly cleared', bg: '#F0FDF4', border: '#10B981' },
        { label: 'FP', value: fp, note: '⚠ False alarm — unnecessary imaging', bg: '#FFFBEB', border: '#F59E0B' },
        { label: 'FN', value: fn, note: '✗✗ MISSED STROKE — 4.5hr tPA window lost', bg: C.redDim, border: C.red },
        { label: 'TP', value: tp, note: '✓ Stroke caught — tPA window preserved', bg: '#EFF6FF', border: C.blue },
    ];
    return (
        <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 12 }}>{name}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {cells.map(({ label, value, note, bg, border }) => (
                    <div key={label} style={{ background: bg, borderRadius: 10, border: `1.5px solid ${border}`, padding: '12px 10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, fontWeight: 700, color: border }}>{label}</span>
                            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 22, fontWeight: 800, color: C.primary }}>{value}</span>
                        </div>
                        <div style={{ fontSize: 10, color: C.secondary, marginTop: 6, lineHeight: 1.4 }}>{note}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const CV_GAP_DATA = [
    { name: 'Logistic Reg', cv: 0.8563, test: 0.8180, gap: 0.0383, stable: true },
    { name: 'AdaBoost', cv: 0.9365, test: 0.7906, gap: 0.1459 },
    { name: 'Random Forest', cv: 0.9926, test: 0.7580, gap: 0.2346, leak: true },
    { name: 'XGBoost', cv: 0.9911, test: 0.7236, gap: 0.2675, leak: true },
];

export default function ModelArenaTab() {
    const [hoveredModel, setHoveredModel] = useState(null);
    const [sortCol, setSortCol] = useState('auc');

    const cols = [
        { key: 'name', label: 'Model' }, { key: 'accuracy', label: 'Accuracy' }, { key: 'precision', label: 'Precision' },
        { key: 'recall', label: 'Recall' }, { key: 'f1', label: 'F1' }, { key: 'auc', label: 'AUC-ROC' },
        { key: 'specificity', label: 'Specificity' }, { key: 'kappa', label: 'Kappa' }, { key: 'cvAuc', label: 'CV AUC' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Metrics Table */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>Model Metrics Comparison</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                        <thead>
                            <tr>
                                {cols.map(c => (
                                    <th key={c.key} onClick={() => setSortCol(c.key)} style={{
                                        padding: '8px 10px', textAlign: 'left', color: C.secondary, fontWeight: 600,
                                        borderBottom: `2px solid ${C.border}`, cursor: 'pointer', whiteSpace: 'nowrap',
                                        background: sortCol === c.key ? '#F9FAFB' : 'transparent',
                                    }}>
                                        {c.label} {sortCol === c.key ? '↓' : ''}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...sorted].sort((a, b) => sortCol === 'name' ? (a.name > b.name ? 1 : -1) : b[sortCol] - a[sortCol]).map(m => {
                                const isTop = m.name === 'Logistic Regression';
                                return (
                                    <tr key={m.name} style={{
                                        background: isTop ? '#FFF8F8' : 'transparent',
                                        borderLeft: isTop ? `3px solid ${C.red}` : '3px solid transparent',
                                        transition: 'background 0.15s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                                        onMouseLeave={e => e.currentTarget.style.background = isTop ? '#FFF8F8' : 'transparent'}>
                                        <td style={{ padding: '10px 10px', fontWeight: isTop ? 700 : 500, color: C.primary, whiteSpace: 'nowrap' }}>{m.name}</td>
                                        {['accuracy', 'precision', 'recall', 'f1', 'auc', 'specificity', 'kappa'].map(k => (
                                            <td key={k} style={{ padding: '10px 10px', minWidth: 90 }}>
                                                {k === 'recall' ? <MiniBar value={m[k]} color={C.red} /> :
                                                    k === 'auc' ? <MiniBar value={m[k]} color={C.blue} /> :
                                                        <span style={{
                                                            fontFamily: "'IBM Plex Mono',monospace", fontSize: 12,
                                                            color: m[k] === bests[k] ? C.red : C.secondary,
                                                            fontWeight: m[k] === bests[k] ? 800 : 400,
                                                        }}>{m[k].toFixed(4)}</span>}
                                            </td>
                                        ))}
                                        <td style={{ padding: '10px 10px' }}>
                                            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, color: C.secondary }}>
                                                {m.cvAuc.toFixed(4)} ± {m.cvStd.toFixed(4)}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* ROC Curve */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>ROC Curves — All Models</h3>
                <p style={{ fontSize: 13, color: C.secondary, marginBottom: 16 }}>Hover legend items to highlight individual curves.</p>
                <ROCChart hoveredModel={hoveredModel} setHoveredModel={setHoveredModel} />
            </Card>

            {/* Confusion Matrices */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>Confusion Matrices — Top 2 Models</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    {Object.entries(CONFUSION_MATRICES).map(([name, m]) => (
                        <ConfusionMatrix key={name} name={name} matrix={m} />
                    ))}
                </div>
            </Card>

            {/* CV vs Test Gap */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>CV vs Test AUC — Overfitting Gap</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {CV_GAP_DATA.map(m => (
                        <div key={m.name}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontWeight: 600, color: C.primary, fontSize: 13 }}>{m.name}</span>
                                <span style={{
                                    fontFamily: "'IBM Plex Mono',monospace", fontSize: 11,
                                    color: m.leak ? C.red : m.stable ? C.success : C.warning,
                                    fontWeight: 700
                                }}>
                                    Gap: {m.gap.toFixed(4)} {m.leak ? '← SMOTE leakage' : m.stable ? '← Stable' : ''}
                                </span>
                            </div>
                            <div style={{ position: 'relative', height: 20, background: '#F3F4F6', borderRadius: 4 }}>
                                <div style={{ position: 'absolute', left: 0, width: `${m.test * 100}%`, height: '100%', background: C.blue, borderRadius: 4, opacity: 0.7 }} />
                                <div style={{ position: 'absolute', left: 0, width: `${m.cv * 100}%`, height: '100%', borderRadius: 4, border: `2px solid ${m.leak ? C.red : C.success}`, boxSizing: 'border-box' }} />
                                <span style={{ position: 'absolute', right: 4, top: 2, fontSize: 10, color: '#fff', fontFamily: "'IBM Plex Mono',monospace" }}>CV:{m.cv.toFixed(3)} Test:{m.test.toFixed(3)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <Callout>
                    <p style={{ fontSize: 13, color: C.primary, margin: 0 }}>
                        <strong>SMOTE-CV Leakage:</strong> When SMOTE is applied before cross-validation splitting, synthetic samples leak between folds, artificially inflating CV AUC.
                        Random Forest (Δ=0.235) and XGBoost (Δ=0.268) show severe leakage. Logistic Regression (Δ=0.038) remains stable because it is less susceptible to overfitting synthetic data.
                    </p>
                </Callout>
            </Card>
        </div>
    );
}
