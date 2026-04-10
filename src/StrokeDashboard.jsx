import React, { useState } from 'react';
import OverviewTab from './components/OverviewTab.jsx';
import ModelArenaTab from './components/ModelArenaTab.jsx';
import FeatureTab from './components/FeatureTab.jsx';
import PatientTab from './components/PatientTab.jsx';

const TABS = [
    { id: 'overview', icon: '🧠', label: 'Overview' },
    { id: 'arena', icon: '⚔️', label: 'Model Arena' },
    { id: 'features', icon: '🔬', label: 'Feature Intelligence' },
    { id: 'patient', icon: '🩺', label: 'Patient Analyzer' },
];

const C = {
    bg: '#F4F5F7', card: '#FFFFFF', red: '#E8323A', primary: '#1A1A2E',
    secondary: '#6B7280', muted: '#9CA3AF', border: '#E5E7EB',
};

export default function StrokeDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
            {/* Header */}
            <div style={{
                position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                borderBottom: `1px solid ${C.border}`,
                boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
            }}>
                <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 22 }}>🧬</span>
                        <span style={{ fontSize: 17, fontWeight: 800, color: C.primary }}>
                            Stroke<span style={{ color: C.red }}>Guard</span> AI
                        </span>
                    </div>

                    {/* Tabs */}
                    <div style={{
                        display: 'flex', gap: 4, flex: 1, justifyContent: 'center',
                        background: '#F3F4F6', borderRadius: 30, padding: '4px', maxWidth: 640
                    }}>
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                flex: 1, padding: '8px 16px', borderRadius: 26, border: 'none', cursor: 'pointer',
                                background: activeTab === tab.id ? '#fff' : 'transparent',
                                color: activeTab === tab.id ? C.red : C.muted,
                                fontWeight: activeTab === tab.id ? 700 : 500,
                                fontSize: 13, fontFamily: "'DM Sans',sans-serif",
                                boxShadow: activeTab === tab.id ? '0 1px 6px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all 0.2s ease',
                                whiteSpace: 'nowrap',
                            }}>
                                {tab.icon} {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Caption */}
                    <div style={{ fontSize: 11, color: C.muted, textAlign: 'right', flexShrink: 0, lineHeight: 1.5 }}>
                        Kaggle Stroke Dataset<br />
                        5,109 Patients · 7 Classifiers
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 32px 64px' }}>
                <div key={activeTab} style={{ animation: 'fadeUp 0.25s ease both' }}>
                    {activeTab === 'overview' && <OverviewTab />}
                    {activeTab === 'arena' && <ModelArenaTab />}
                    {activeTab === 'features' && <FeatureTab />}
                    {activeTab === 'patient' && <PatientTab />}
                </div>
            </div>
        </div>
    );
}
