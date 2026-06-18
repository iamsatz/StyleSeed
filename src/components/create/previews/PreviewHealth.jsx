import React, { useRef, useEffect } from 'react'
import SectionWrapper from './SectionWrapper'
import { getPreviewSections, getDefaultSections } from '../../../lib/previewSectionOptions'

function applyKit(el, kit) {
  if (!el || !kit) return
  const palette = kit.palette.light
  const roles = ['background', 'surface', 'primary', 'secondary', 'accent', 'text', 'textMuted', 'border', 'success', 'warning']
  roles.forEach((role) => { if (palette[role]) el.style.setProperty(`--hp-${role}`, palette[role]) })
  if (kit.typography) {
    const heading = kit.typography.headingFont || kit.typography.displayFont
    const body = kit.typography.bodyFont || heading
    if (heading) el.style.setProperty('--hp-heading-font', `'${heading}', sans-serif`)
    if (body) el.style.setProperty('--hp-body-font', `'${body}', sans-serif`)
  }
}

const APPOINTMENTS = [
  { doctor: 'Dr. Sarah Chen', specialty: 'Cardiologist', date: 'Tomorrow', time: '10:30 AM', type: 'In-person' },
  { doctor: 'Dr. James Park', specialty: 'General Practitioner', date: 'Jun 22', time: '2:00 PM', type: 'Video call' },
  { doctor: 'Dr. Maria Lopez', specialty: 'Dermatologist', date: 'Jul 3', time: '11:15 AM', type: 'In-person' },
]

const VITALS = [
  { label: 'Heart Rate', value: '72', unit: 'bpm', icon: '❤️', trend: '+2', status: 'normal' },
  { label: 'Blood Pressure', value: '118/76', unit: 'mmHg', icon: '🩺', trend: '-4', status: 'normal' },
  { label: 'Blood Sugar', value: '98', unit: 'mg/dL', icon: '🩸', trend: '+5', status: 'normal' },
  { label: 'Weight', value: '165', unit: 'lbs', icon: '⚖️', trend: '-1.2', status: 'normal' },
]

const MEDS = [
  { name: 'Lisinopril 10mg', schedule: 'Every morning', refill: '12 days left' },
  { name: 'Metformin 500mg', schedule: 'Twice daily', refill: '24 days left' },
  { name: 'Vitamin D3 2000IU', schedule: 'Daily', refill: '45 days left' },
]

// ── Header variants ───────────────────────────────────────────────────────────

function HeaderPatient() {
  return (
    <div style={{ background: 'var(--hp-primary)', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>👤</div>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Welcome back,</div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--hp-heading-font)' }}>Alex Johnson</div>
        <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)' }}>Patient ID: #HP-20483 · Age 34</div>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>4</div>
          <div style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.7)' }}>Upcoming</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: '6px 12px', textAlign: 'center' }}>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: '#ffffff' }}>2</div>
          <div style={{ fontSize: '0.5625rem', color: 'rgba(255,255,255,0.7)' }}>Prescriptions</div>
        </div>
      </div>
    </div>
  )
}

function HeaderClinic() {
  return (
    <div style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)' }}>HealthCore</div>
      <div style={{ flex: 1, display: 'flex', gap: 16 }}>
        {['Dashboard','Appointments','Records','Prescriptions','Messages'].map((l, i) => (
          <span key={l} style={{ fontSize: '0.75rem', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--hp-primary)' : 'var(--hp-textMuted)', cursor: 'pointer', borderBottom: i === 0 ? '2px solid var(--hp-primary)' : 'none', paddingBottom: 2 }}>{l}</span>
        ))}
      </div>
      <button className="lp-btn lp-btn--primary lp-btn--sm">Book visit</button>
    </div>
  )
}

function HeaderMinimal() {
  return (
    <div style={{ padding: '14px 20px', background: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--hp-border)' }}>
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)' }}>My Health Dashboard</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>Last updated today at 8:32 AM</div>
      </div>
      <button className="lp-btn lp-btn--primary lp-btn--sm">+ Log reading</button>
    </div>
  )
}

// ── Appointment variants ──────────────────────────────────────────────────────

function AppointmentsCalendar() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const dates = [16,17,18,19,20,21,22]
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Upcoming appointments</div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {days.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', padding: '6px 4px', borderRadius: 8, background: i === 2 ? 'var(--hp-primary)' : 'var(--hp-surface)', border: '1px solid var(--hp-border)' }}>
            <div style={{ fontSize: '0.5rem', color: i === 2 ? 'rgba(255,255,255,0.8)' : 'var(--hp-textMuted)', textTransform: 'uppercase', fontWeight: 600 }}>{d}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: i === 2 ? '#ffffff' : 'var(--hp-text)' }}>{dates[i]}</div>
            {i === 2 && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#ffffff', margin: '2px auto 0' }} />}
          </div>
        ))}
      </div>
      <div className="lp-card" style={{ padding: '10px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)' }}>Dr. Sarah Chen</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>Cardiologist · Tomorrow 10:30 AM</div>
          </div>
          <span style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: 20, background: 'rgba(var(--hp-primary-rgb,139,92,246),0.1)', color: 'var(--hp-primary)', fontWeight: 700 }}>In-person</span>
        </div>
      </div>
    </div>
  )
}

function AppointmentsList() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>Appointments</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-primary)', fontWeight: 600, cursor: 'pointer' }}>Schedule new</div>
      </div>
      {APPOINTMENTS.map((apt, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < APPOINTMENTS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--hp-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>🩺</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{apt.doctor}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{apt.specialty}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text)' }}>{apt.date}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{apt.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function AppointmentsUpcoming() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Next appointment</div>
      <div style={{ background: 'var(--hp-primary)', borderRadius: 12, padding: '14px 16px', color: '#ffffff' }}>
        <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>Tomorrow · 10:30 AM</div>
        <div style={{ fontSize: '0.9375rem', fontWeight: 800, fontFamily: 'var(--hp-heading-font)', marginBottom: 2 }}>Dr. Sarah Chen</div>
        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', marginBottom: 12 }}>Cardiology · City Medical Center, Floor 4</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ flex: 1, padding: '6px', borderRadius: 8, background: 'rgba(255,255,255,0.2)', border: 'none', color: '#ffffff', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>Reschedule</button>
          <button style={{ flex: 1, padding: '6px', borderRadius: 8, background: '#ffffff', border: 'none', color: 'var(--hp-primary)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Get directions</button>
        </div>
      </div>
    </div>
  )
}

// ── Vitals variants ───────────────────────────────────────────────────────────

function VitalsCharts() {
  const HR_DATA = [68, 72, 75, 70, 74, 72, 71]
  const max = Math.max(...HR_DATA)
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Vitals overview</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div className="lp-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 2 }}>Heart Rate</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--hp-text)' }}>72 <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: 'var(--hp-textMuted)' }}>bpm</span></div>
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 24, marginTop: 4 }}>
            {HR_DATA.map((v, i) => (
              <div key={i} style={{ flex: 1, height: Math.round((v / max) * 20), background: i === HR_DATA.length - 1 ? 'var(--hp-primary)' : 'var(--hp-border)', borderRadius: 2 }} />
            ))}
          </div>
        </div>
        <div className="lp-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 2 }}>Blood Pressure</div>
          <div style={{ fontSize: '1.125rem', fontWeight: 900, color: 'var(--hp-text)' }}>118/76</div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success)', fontWeight: 600, marginTop: 4 }}>Normal range</div>
        </div>
        <div className="lp-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 2 }}>Blood Sugar</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--hp-text)' }}>98 <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: 'var(--hp-textMuted)' }}>mg/dL</span></div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success)', fontWeight: 600, marginTop: 4 }}>Within target</div>
        </div>
        <div className="lp-card" style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: 2 }}>Weight</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--hp-text)' }}>165 <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: 'var(--hp-textMuted)' }}>lbs</span></div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-success)', fontWeight: 600, marginTop: 4 }}>-1.2 this week</div>
        </div>
      </div>
    </div>
  )
}

function VitalsCards() {
  return (
    <div style={{ padding: '0 20px 16px', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {VITALS.map((v, i) => (
        <div key={i} className="lp-card" style={{ flex: '1 1 120px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: '1.25rem' }}>{v.icon}</div>
          <div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{v.label}</div>
            <div style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--hp-text)' }}>{v.value} <span style={{ fontSize: '0.625rem', fontWeight: 500, color: 'var(--hp-textMuted)' }}>{v.unit}</span></div>
            <div style={{ fontSize: '0.625rem', color: 'var(--hp-success)', fontWeight: 600 }}>{v.trend}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

function VitalsMeds() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Prescriptions</div>
      {MEDS.map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < MEDS.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem' }}>💊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{m.name}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{m.schedule}</div>
          </div>
          <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', background: 'var(--hp-surface)', padding: '3px 8px', borderRadius: 12, border: '1px solid var(--hp-border)', whiteSpace: 'nowrap' }}>{m.refill}</div>
        </div>
      ))}
    </div>
  )
}

export default function PreviewHealth({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('health')
  const defaults = getDefaultSections('health')
  const config = { ...defaults, ...sectionConfig }

  function wrap(sectionKey, children) {
    const sectionDef = sections.find((s) => s.key === sectionKey)
    return (
      <SectionWrapper
        key={sectionKey}
        label={sectionDef?.label || sectionKey}
        sectionKey={sectionKey}
        variants={sectionDef?.variants || []}
        currentVariant={config[sectionKey]}
        onSectionChange={onSectionChange}
      >
        {children}
      </SectionWrapper>
    )
  }

  const headerNode =
    config.header === 'clinic' ? <HeaderClinic /> :
    config.header === 'minimal' ? <HeaderMinimal /> :
    <HeaderPatient />

  const appointmentsNode =
    config.appointments === 'list' ? <AppointmentsList /> :
    config.appointments === 'upcoming' ? <AppointmentsUpcoming /> :
    <AppointmentsCalendar />

  const vitalsNode =
    config.vitals === 'cards' ? <VitalsCards /> :
    config.vitals === 'meds' ? <VitalsMeds /> :
    <VitalsCharts />

  return (
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)', minHeight: '100%' }}>
      {wrap('header', headerNode)}
      {wrap('appointments', appointmentsNode)}
      {wrap('vitals', vitalsNode)}
    </div>
  )
}
