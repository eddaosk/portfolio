import { gsap } from 'gsap'
import { WATER_DURATION } from './constants.js'

const SESSION_KEY = 'vasuqi-intro-seen'

let waveLoop1, waveLoop2, highlightDrift, snakeBreathe

export function initIntroAnimation() {
  const section = document.getElementById('intro-animation')
  if (!section) return

  if (new URLSearchParams(location.search).has('replay')) {
    sessionStorage.removeItem(SESSION_KEY)
  }

  if (sessionStorage.getItem(SESSION_KEY)) return

  section.style.display = 'grid'
  section.style.pointerEvents = 'auto'
  document.body.style.overflow = 'hidden'

  let tl = null
  let dismissed = false

  // Screen reader live region — injected outside #intro-animation (which carries
  // aria-hidden="true") so assistive technology receives the announcement.
  const liveRegion = document.createElement('div')
  liveRegion.setAttribute('role', 'status')
  liveRegion.setAttribute('aria-live', 'polite')
  liveRegion.className = 'sr-only'
  liveRegion.textContent = 'Intro animation playing. Press Escape or click anywhere to skip.'
  const mainContent = document.getElementById('main-content')
  document.body.insertBefore(liveRegion, mainContent)

  function fadeOut() {
    if (dismissed) return
    dismissed = true
    section.style.pointerEvents = 'none'
    sessionStorage.setItem(SESSION_KEY, '1')
    liveRegion.remove()
    gsap.to(section, {
      opacity: 0,
      duration: WATER_DURATION.fast,
      ease: 'sine.out',
      onComplete: () => {
        section.style.display = 'none'
        document.body.style.overflow = ''
      }
    })
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') dismiss()
  }

  function dismiss() {
    if (tl) { tl.kill(); tl = null }
    if (waveLoop1) { waveLoop1.kill(); waveLoop1 = null }
    if (waveLoop2) { waveLoop2.kill(); waveLoop2 = null }
    if (highlightDrift) { highlightDrift.kill(); highlightDrift = null }
    if (snakeBreathe) { snakeBreathe.kill(); snakeBreathe = null }
    section.removeEventListener('click', dismiss)
    section.removeEventListener('touchstart', dismiss)
    document.removeEventListener('keydown', onKeyDown)
    fadeOut()
  }

  section.addEventListener('click', dismiss)
  section.addEventListener('touchstart', dismiss, { passive: true })
  document.addEventListener('keydown', onKeyDown)

  const textEl = document.getElementById('introText')
  const clipMidRect = document.getElementById('clip-fill-mid-rect')
  const clipSoftRect = document.getElementById('clip-fill-soft-rect')
  const maskWedge = document.getElementById('snake-mask-wedge')
  if (!textEl || !clipMidRect || !clipSoftRect || !maskWedge) {
    document.body.style.overflow = ''
    return
  }
  textEl.textContent = 'The last 5%'

  gsap.set('#introText', { opacity: 0, y: 0 })
  gsap.set('#iris', { opacity: 0 })
  gsap.set('#hl, #hl2, #rim, #glow', { opacity: 0 })
  gsap.set('#sphereGroup', { opacity: 1 })
  gsap.set('#snake', { opacity: 0, scale: 0.96, transformOrigin: '50% 50%' })
  gsap.set('.body-fill', { opacity: 1, y: 0 })
  // Wave effect: fill layers start hidden and build opacity as the clip rises
  gsap.set('.fill-mid, .fill-soft', { opacity: 0 })
  clipMidRect.setAttribute('y', '140')
  clipSoftRect.setAttribute('y', '140')
  maskWedge.setAttribute('d', '')
  gsap.set('#burst', { scale: 0, opacity: 0 })
  gsap.set('#displace', { attr: { scale: 20 } })
  // Sphere starts at --steel (#5C6B85) — a muted blue-grey before light fills it
  gsap.set('#b0', { attr: { 'stop-color': '#5C6B85' } })
  gsap.set('#b1', { attr: { 'stop-color': '#5C6B85' } })
  gsap.set('#b2', { attr: { 'stop-color': '#5C6B85' } })
  gsap.set('#b3', { attr: { 'stop-color': '#5C6B85' } })
  gsap.set('#d1', { attr: { 'stop-color': 'rgba(92,107,133,0.4)' } })

  tl = gsap.timeline({
    onComplete: () => {
      section.removeEventListener('click', dismiss)
      section.removeEventListener('touchstart', dismiss)
      document.removeEventListener('keydown', onKeyDown)
      liveRegion.remove()
      if (dismissed) return
      dismissed = true
      section.style.pointerEvents = 'none'
      sessionStorage.setItem(SESSION_KEY, '1')
      section.style.display = 'none'
      document.body.style.overflow = ''
    }
  })

  // ── Phase 1+2: Sphere + text + ignition — original prototype timing ─────────

  tl.from('.intro__sphere', { scale: 0.88, opacity: 0, duration: 1.8, ease: 'sine.out', transformOrigin: '50% 50%' })
    .to('#introText', { opacity: 0.85, duration: 1.1, ease: 'sine.out' }, '-=1.0')
    .to('#introText', { opacity: 0, duration: 0.8, ease: 'sine.inOut' }, '+=0.4')
    .call(() => { textEl.textContent = 'polished by light' })
    .to('#introText', { opacity: 0.9, duration: 1.2, ease: 'sine.out' }, '<+0.1')
    .to('#b0', { attr: { 'stop-color': '#FFFFFF' }, duration: 1.0, ease: 'sine.inOut' }, '<+0.2')
    .to('#b1', { attr: { 'stop-color': '#A8C5FF' }, duration: 1.8, ease: 'sine.inOut' }, '<')
    .to('#b2', { attr: { 'stop-color': '#6A93FF' }, duration: 2.2, ease: 'sine.inOut' }, '<')
    .to('#b3', { attr: { 'stop-color': '#6A93FF' }, duration: 2.4, ease: 'sine.inOut' }, '<')
    .to('#d1', { attr: { 'stop-color': 'rgba(0,68,255,0.35)' }, duration: 2.2, ease: 'sine.inOut' }, '<')
    .to('#displace', { attr: { scale: 4 }, duration: 2.4, ease: 'sine.inOut' }, '<')
    .to('#introText', { opacity: 0, duration: 1.0, ease: 'sine.inOut' }, '<+1.2')
    .addLabel('ignitionDone', '>')
    // Snake appears — body-fill is immediately visible, controlled by mask sweep
    .to('#snake', { opacity: 1, scale: 1, duration: 0.01, ease: 'none' }, 'ignitionDone')
    // Glass layers settle quickly
    .to('#glow', { opacity: 1, duration: 0.4, ease: 'sine.inOut' }, '<')
    .to('#iris', { opacity: 0.75, duration: 0.4, ease: 'sine.inOut' }, '<+0.03')
    .to('#hl', { opacity: 1, duration: 0.35, ease: 'sine.out' }, '<+0.03')
    .to('#hl2', { opacity: 0.9, duration: 0.3, ease: 'sine.out' }, '<+0.03')
    .to('#rim', { opacity: 1, duration: 0.35, ease: 'sine.out' }, '<')
    .to('#sphereGroup', { opacity: 0.85, duration: 0.4, ease: 'sine.inOut' }, '<')
    .call(() => {
      highlightDrift = gsap.to('#hl', {
        x: 6, y: -4, duration: 3.0,
        ease: 'sine.inOut', yoyo: true, repeat: -1
      })
    })

  // ── Phase 3: Snake draw + wave fill + burst ──────────────────────────────────

  const wedgeEl = maskWedge
  const startAngle = 302
  const totalSweep = 359
  const sweepObj = { deg: 0 }
  const cx = 72.26, cy = 70.06, r = 120

  function buildWedge(swept) {
    if (swept <= 0) return ''
    if (swept >= 360) {
      return `M${cx},${cy} m-${r},0 a${r},${r} 0 1,1 ${r * 2},0 a${r},${r} 0 1,1 -${r * 2},0`
    }
    const toRad = (d) => (d * Math.PI) / 180
    const a1 = toRad(startAngle), a2 = toRad(startAngle + swept)
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1)
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2)
    const large = swept > 180 ? 1 : 0
    return `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`
  }

  tl.to(
    sweepObj,
    {
      deg: totalSweep, duration: 0.7, ease: 'sine.inOut',
      onUpdate: () => wedgeEl.setAttribute('d', buildWedge(sweepObj.deg)),
      onComplete: () => wedgeEl.setAttribute('d', buildWedge(360))
    },
    'ignitionDone'
  )
    // Bubble fades while snake draws on
    .to('#sphereGroup, .intro__sphere, #iris, #hl, #hl2, #rim, #glow', { opacity: 0, duration: 0.6, ease: 'sine.inOut' }, 'ignitionDone')
    .call(() => {
      snakeBreathe = gsap.to('#snake', {
        scale: 1.01, duration: 3.0,
        ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 50%'
      })
    })
    // Wave fill: starts right as snake draws on, overlapping with the sweep.
    // fill-mid (denser #6A93FF) leads; fill-soft (lighter #A8C5FF) follows 0.6s behind like a second swell.
    // Clip-rect rises AND opacity builds simultaneously — colour appears as the wave crests.
    .addLabel('waterStart', 'ignitionDone+=0.15')
    .fromTo('#clip-fill-mid-rect', { attr: { y: 140 } }, { attr: { y: -20 }, duration: 2.0, ease: 'sine.inOut' }, 'waterStart')
    .to('.fill-mid', { opacity: 0.9, duration: 1.8, ease: 'sine.inOut' }, 'waterStart')
    .fromTo('#clip-fill-soft-rect', { attr: { y: 140 } }, { attr: { y: -20 }, duration: 2.0, ease: 'sine.inOut' }, 'waterStart+=0.6')
    .to('.fill-soft', { opacity: 0.8, duration: 1.8, ease: 'sine.inOut' }, 'waterStart+=0.6')
    .addLabel('waterDone', 'waterStart+=2.6')
    .call(() => {
      waveLoop1 = gsap.to('#clip-fill-soft-rect', {
        attr: { y: -18.8 }, duration: 4.0,
        ease: 'sine.inOut', yoyo: true, repeat: -1
      })
      waveLoop2 = gsap.to('#clip-fill-mid-rect', {
        attr: { y: -20.9 }, duration: 3.5,
        ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.3
      })
    }, [], 'waterDone')
    // Burst fires, snake fades, overlay dissolves
    .to('#burst', { opacity: 1, scale: 1, duration: 0.2, ease: 'sine.out' }, 'waterDone')
    .to('#snake, .intro__sphere, #iris, #hl, #hl2, #rim, #glow', { opacity: 0, duration: 0.3, ease: 'sine.inOut' }, '<+0.05')
    .to('#burst', { scale: 25, duration: 0.45, ease: 'power2.in' }, '<')
    .to(section, { opacity: 0, duration: 0.2, ease: 'sine.out' }, '-=0.15')
}
