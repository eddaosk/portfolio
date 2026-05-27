import { gsap } from 'gsap'
import { WATER_EASE, WATER_DURATION, WATER_STAGGER } from './constants.js'

export function initFloatingLight() {
  const container = document.getElementById('floating-light')
  if (!container) return

  const beams = container.querySelectorAll('.fl-beam')
  if (!beams.length) return

  beams.forEach((beam, i) => {
    gsap.to(beam, {
      y: '-=35',
      opacity: '+=0.08',
      duration: WATER_DURATION.slow + i * 0.4,
      ease: WATER_EASE,
      repeat: -1,
      yoyo: true,
      delay: i * WATER_STAGGER * 4,
    })
  })
}
