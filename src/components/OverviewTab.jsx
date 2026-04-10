import React from 'react';

const C = {
    bg: '#F4F5F7', card: '#FFFFFF', red: '#E8323A', redDim: '#FDECEA',
    primary: '#1A1A2E', secondary: '#6B7280', muted: '#9CA3AF',
    border: '#E5E7EB', success: '#10B981', warning: '#F59E0B', blue: '#3B82F6',
};

const Card = ({ children, style = {} }) => (
    <div style={{ background: C.card, borderRadius: 16, padding: 24, boxShadow: '0 1px 8px rgba(0,0,0,0.07)', ...style }}>
        {children}
    </div>
);

const Callout = ({ children, style = {} }) => (
    <div style={{ borderLeft: `4px solid ${C.red}`, background: C.redDim, borderRadius: '0 8px 8px 0', padding: '12px 16px', ...style }}>
        {children}
    </div>
);

const PIPELINE_STEPS = [
    { num: 1, title: 'Drop patient_id', desc: 'Remove non-informative ID column from feature set' },
    { num: 2, title: "Remove gender='Other'", desc: '1 record removed for class completeness' },
    { num: 3, title: 'BMI Median Imputation', desc: '201 missing BMI values imputed with training median' },
    { num: 4, title: 'One-Hot Encoding', desc: '5 categorical cols → 16 binary features' },
    { num: 5, title: 'Stratified 80/20 Split', desc: 'Preserves 4.9% stroke prevalence in both partitions' },
    { num: 6, title: 'StandardScaler', desc: 'Fit on train only — prevents data leakage to test' },
    { num: 7, title: 'SMOTE (Train Only)', desc: 'Oversamples minority class in training set only', accent: true },
];

export default function OverviewTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Hero Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                {[
                    { label: 'Dataset Size', value: '5,109', sub: 'patients' },
                    { label: 'Stroke Prevalence', value: '4.9%', sub: '248 positive cases' },
                    { label: 'Best AUC-ROC', value: '0.818', sub: 'Logistic Regression' },
                    { label: 'Top Predictor', value: 'Age', sub: 'SHAP dominant feature' },
                ].map(({ label, value, sub }) => (
                    <Card key={label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, color: C.muted, textTransform: 'uppercase', marginBottom: 8 }}>{label}</div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 32, fontWeight: 700, color: C.primary, lineHeight: 1 }}>{value}</div>
                        <div style={{ fontSize: 12, color: C.secondary, marginTop: 6 }}>{sub}</div>
                    </Card>
                ))}
            </div>

            {/* Class Imbalance */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 16 }}>Class Imbalance</h3>
                <div style={{ display: 'flex', gap: 4, height: 64, borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
                    <div style={{ flex: 95.1, background: C.border, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.secondary }}>No Stroke — 95.1% — 4,861 patients</span>
                    </div>
                    <div style={{ flex: 4.9, background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 80 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>Stroke 4.9%</span>
                    </div>
                </div>
                <Callout>
                    <p style={{ fontSize: 13, color: C.primary, margin: 0 }}>
                        <strong>Why accuracy is misleading here:</strong> A model predicting "no stroke" for every patient achieves 95.1% accuracy yet catches zero strokes.
                        This motivates <strong>AUC-ROC as the primary metric</strong> and <strong>SMOTE oversampling</strong> to balance the training set.
                    </p>
                </Callout>
            </Card>

            {/* Preprocessing Pipeline */}
            <Card>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: C.primary, marginBottom: 24 }}>Preprocessing Pipeline</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, overflowX: 'auto', paddingBottom: 8 }}>
                    {PIPELINE_STEPS.map((step, i) => (
                        <div key={step.num} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 120 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: step.accent ? C.red : C.primary, color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0,
                                    boxShadow: step.accent ? `0 0 0 4px ${C.redDim}` : 'none',
                                }}>{step.num}</div>
                                <div style={{ marginTop: 8, textAlign: 'center' }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: step.accent ? C.red : C.primary, marginBottom: 4 }}>{step.title}</div>
                                    <div style={{ fontSize: 11, color: C.secondary, lineHeight: 1.4 }}>{step.desc}</div>
                                </div>
                            </div>
                            {i < PIPELINE_STEPS.length - 1 && (
                                <div style={{ height: 2, width: 24, background: C.border, marginTop: 17, flexShrink: 0 }} />
                            )}
                        </div>
                    ))}
                </div>
                <Callout style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 13, color: C.primary, margin: 0 }}>
                        <strong>Why no test-set SMOTE?</strong> SMOTE was applied exclusively to the training partition. The test set retains real-world 4.9% prevalence
                        so evaluation metrics reflect genuine clinical deployment conditions.
                    </p>
                </Callout>
            </Card>
        </div>
    );
}
