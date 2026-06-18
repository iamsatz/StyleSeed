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

const COURSES = [
  { title: 'UI/UX Foundations', category: 'Design', lessons: 24, duration: '8h 30m', level: 'Beginner', pct: 72 },
  { title: 'React for Designers', category: 'Frontend', lessons: 18, duration: '6h 15m', level: 'Intermediate', pct: 45 },
  { title: 'Design Systems at Scale', category: 'Design', lessons: 32, duration: '12h', level: 'Advanced', pct: 20 },
  { title: 'CSS Mastery', category: 'Frontend', lessons: 20, duration: '7h 40m', level: 'Intermediate', pct: 0 },
]

const CATEGORIES = ['All Courses', 'Design', 'Frontend', 'Motion', 'Accessibility', 'Strategy']
const LEVEL_COLORS = { Beginner: 'success', Intermediate: 'warning', Advanced: 'primary' }

// ── Hero variants ─────────────────────────────────────────────────────────────

function HeroSearch() {
  return (
    <div style={{ background: 'var(--hp-primary)', padding: '28px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 8 }}>10,000+ lessons · Learn at your pace</div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.2 }}>
          Skills that get you hired
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)', margin: '0 auto', lineHeight: 1.6 }}>
          Master design, code, and product skills with expert-led courses.
        </p>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10, display: 'flex', alignItems: 'center', padding: '10px 14px', gap: 8, maxWidth: 480, margin: '0 auto' }}>
        <span style={{ fontSize: '0.875rem' }}>🔍</span>
        <span style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)' }}>Search for courses, skills, or instructors...</span>
      </div>
    </div>
  )
}

function HeroFeatured() {
  return (
    <div style={{ background: 'var(--hp-surface)', borderBottom: '1px solid var(--hp-border)', display: 'flex', gap: 0 }}>
      <div style={{ flex: 1, padding: '24px 20px' }}>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--hp-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Featured Course</div>
        <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 6, lineHeight: 1.25 }}>Design Systems at Scale</div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--hp-textMuted)', marginBottom: 12, lineHeight: 1.6 }}>
          Build and maintain robust design systems used by 50k+ users. Includes Figma, tokens, and documentation.
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <button className="lp-btn lp-btn--primary lp-btn--sm">Enroll now — Free</button>
          <span style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>⭐ 4.9 · 3,842 students</span>
        </div>
      </div>
      <div style={{ width: 120, flexShrink: 0, background: 'var(--hp-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <div style={{ fontSize: '2.5rem' }}>📐</div>
        <div style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textAlign: 'center' }}>32 lessons<br />12h content</div>
      </div>
    </div>
  )
}

function HeroCategories() {
  const cats = [['🎨','Design','42 courses'],['💻','Frontend','38 courses'],['🎬','Motion','19 courses'],['📊','Analytics','14 courses']]
  return (
    <div style={{ background: 'var(--hp-background)', padding: '16px 20px', borderBottom: '1px solid var(--hp-border)' }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'var(--hp-text)', fontFamily: 'var(--hp-heading-font)', marginBottom: 12 }}>Browse by category</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {cats.map(([ico, name, count]) => (
          <div key={name} className="lp-card" style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.125rem' }}>{ico}</div>
            <div>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)' }}>{name}</div>
              <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)' }}>{count}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Course list variants ──────────────────────────────────────────────────────

function CoursesGrid() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto' }}>
        {CATEGORIES.map((c, i) => (
          <div key={c} style={{ padding: '4px 10px', borderRadius: 20, background: i === 0 ? 'var(--hp-primary)' : 'var(--hp-surface)', border: '1px solid var(--hp-border)', fontSize: '0.6875rem', fontWeight: 600, color: i === 0 ? '#ffffff' : 'var(--hp-textMuted)', cursor: 'pointer', whiteSpace: 'nowrap' }}>{c}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {COURSES.slice(0, 4).map((course, i) => (
          <div key={i} className="lp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ height: 56, background: `var(--hp-${['primary','secondary','accent','success'][i]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              {['🎨','⚛️','📐','🎯'][i]}
            </div>
            <div style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2, lineHeight: 1.3 }}>{course.title}</div>
              <div style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)', marginBottom: 6 }}>{course.lessons} lessons · {course.duration}</div>
              {course.pct > 0 && (
                <div>
                  <div style={{ height: 3, background: 'var(--hp-border)', borderRadius: 2 }}>
                    <div style={{ width: `${course.pct}%`, height: '100%', background: 'var(--hp-primary)', borderRadius: 2 }} />
                  </div>
                  <div style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted)', marginTop: 2 }}>{course.pct}% complete</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoursesList() {
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>My courses</div>
      {COURSES.map((course, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < COURSES.length - 1 ? '1px solid var(--hp-border)' : 'none' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: `var(--hp-${['primary','secondary','accent','success'][i]})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>
            {['🎨','⚛️','📐','🎯'][i]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 2 }}>{course.title}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginBottom: course.pct > 0 ? 6 : 0 }}>{course.category} · {course.lessons} lessons · {course.duration}</div>
            {course.pct > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, background: 'var(--hp-border)', borderRadius: 2 }}>
                  <div style={{ width: `${course.pct}%`, height: '100%', background: 'var(--hp-primary)', borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: '0.625rem', color: 'var(--hp-textMuted)', whiteSpace: 'nowrap' }}>{course.pct}%</span>
              </div>
            )}
          </div>
          <div style={{ fontSize: '0.6875rem', padding: '3px 8px', borderRadius: 12, background: 'var(--hp-surface)', border: '1px solid var(--hp-border)', color: `var(--hp-${LEVEL_COLORS[course.level] || 'textMuted'})`, fontWeight: 600, whiteSpace: 'nowrap' }}>{course.level}</div>
        </div>
      ))}
    </div>
  )
}

function CoursesFeatured() {
  const course = COURSES[0]
  return (
    <div style={{ padding: '14px 20px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Continue learning</div>
      <div style={{ background: 'var(--hp-primary)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px' }}>
          <div style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.7)', marginBottom: 4 }}>IN PROGRESS · {course.pct}% complete</div>
          <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--hp-heading-font)', marginBottom: 8 }}>{course.title}</div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 4, marginBottom: 12 }}>
            <div style={{ width: `${course.pct}%`, height: '100%', background: '#ffffff', borderRadius: 4 }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ flex: 1, padding: '7px', borderRadius: 8, background: '#ffffff', border: 'none', color: 'var(--hp-primary)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Resume lesson 18</button>
            <button style={{ padding: '7px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.15)', border: 'none', color: '#ffffff', fontSize: '0.75rem', cursor: 'pointer' }}>Syllabus</button>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
        {COURSES.slice(1, 4).map((c, i) => (
          <div key={i} className="lp-card" style={{ padding: '10px 10px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--hp-text)', lineHeight: 1.3, marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: '0.5625rem', color: 'var(--hp-textMuted)' }}>{c.lessons} lessons</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Progress variants ─────────────────────────────────────────────────────────

function ProgressDashboard() {
  const stats = [['🏆','4 Courses','Active'],['🎯','72%','Avg progress'],['⏱️','24h 45m','Time invested'],['🔥','14 days','Streak']]
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Learning stats</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {stats.map(([ico, val, lbl], i) => (
          <div key={i} className="lp-card" style={{ padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.125rem', marginBottom: 2 }}>{ico}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 800, color: 'var(--hp-text)' }}>{val}</div>
            <div style={{ fontSize: '0.5625rem', color: 'var(--hp-textMuted)' }}>{lbl}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgressStats() {
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 180 }}>
          <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>This week</div>
          <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 56 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => {
              const h = [20, 45, 30, 55, 38, 10, 0][i]
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <div style={{ width: '100%', height: h, background: i === 4 ? 'var(--hp-primary)' : 'var(--hp-surface)', border: '1px solid var(--hp-border)', borderRadius: '3px 3px 0 0', transition: 'height 0.3s' }} />
                  <span style={{ fontSize: '0.5rem', color: 'var(--hp-textMuted)' }}>{d}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[['🔥','14-day streak'],['🎯','3 goals met'],['📖','2 lessons today']].map(([ico, lbl]) => (
            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--hp-surface)', borderRadius: 8, border: '1px solid var(--hp-border)' }}>
              <span>{ico}</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--hp-text)' }}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProgressActivity() {
  const activity = [
    { action: 'Completed', item: 'Lesson 17: Component Variants', time: '2h ago' },
    { action: 'Started', item: 'React for Designers', time: 'Yesterday' },
    { action: 'Earned badge', item: '🏆 Design Fundamentals', time: 'Jun 14' },
    { action: 'Completed', item: 'CSS Mastery — Module 3', time: 'Jun 12' },
  ]
  return (
    <div style={{ padding: '0 20px 16px' }}>
      <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--hp-text)', marginBottom: 10 }}>Recent activity</div>
      {activity.map((a, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, paddingBottom: 10, position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--hp-primary)', flexShrink: 0, marginTop: 3 }} />
            {i < activity.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--hp-border)', marginTop: 4 }} />}
          </div>
          <div style={{ paddingBottom: i < activity.length - 1 ? 4 : 0 }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)', marginBottom: 1 }}>{a.action}</div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--hp-text)' }}>{a.item}</div>
            <div style={{ fontSize: '0.6875rem', color: 'var(--hp-textMuted)', marginTop: 1 }}>{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function PreviewEducation({ kit, sectionConfig = {}, onSectionChange }) {
  const ref = useRef(null)
  useEffect(() => { applyKit(ref.current, kit) }, [kit])
  if (!kit) return null

  const sections = getPreviewSections('education')
  const defaults = getDefaultSections('education')
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

  const heroNode =
    config.hero === 'featured' ? <HeroFeatured /> :
    config.hero === 'categories' ? <HeroCategories /> :
    <HeroSearch />

  const coursesNode =
    config.courses === 'list' ? <CoursesList /> :
    config.courses === 'featured' ? <CoursesFeatured /> :
    <CoursesGrid />

  const progressNode =
    config.progress === 'stats' ? <ProgressStats /> :
    config.progress === 'activity' ? <ProgressActivity /> :
    <ProgressDashboard />

  return (
    <div ref={ref} style={{ fontFamily: 'var(--hp-body-font, sans-serif)', background: 'var(--hp-background)', minHeight: '100%' }}>
      <nav style={{ height: 44, borderBottom: '1px solid var(--hp-border)', background: 'var(--hp-surface)', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12 }}>
        <div style={{ fontWeight: 800, fontSize: '0.9375rem', color: 'var(--hp-primary)', fontFamily: 'var(--hp-heading-font)' }}>LearnFlow</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: '0.75rem', color: 'var(--hp-textMuted)' }}>My learning</div>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--hp-primary)', color: 'var(--hp-background)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: 800 }}>AJ</div>
      </nav>
      {wrap('hero', heroNode)}
      {wrap('courses', coursesNode)}
      {wrap('progress', progressNode)}
    </div>
  )
}
