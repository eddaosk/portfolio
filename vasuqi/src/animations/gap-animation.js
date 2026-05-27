import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Initialise The Gap section animations:
 * 1. Heading / subheading / pronunciation label fade + slide in
 * 2. SVG chart lines draw on via stroke-dashoffset
 * 3. Glass panel fades in after lines complete
 *
 * Uses a single GSAP timeline on a ScrollTrigger (once:true, invalidateOnRefresh:true).
 * start: "top 85%" — triggers early so fast-scroll doesn't leave content invisible.
 */
export function initGapAnimation() {
  const section = document.querySelector('#the-gap')
  if (!section) return

  const lineImgs = section.querySelectorAll('.gap-line-img')
  const glassPanel = section.querySelector('.gap-glass-panel')
  const headingEls = section.querySelectorAll(
    '.text-picture-desc, .section-heading, .section-subheading, .gap-chart-legend, .gap-pill-banner'
  )

  // Clip from right so lines are hidden; animating to 0% reveals left → right
  gsap.set(lineImgs, { clipPath: 'inset(0 100% 0 0)' })
  if (glassPanel) gsap.set(glassPanel, { opacity: 0 })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#the-gap',
      start: 'top 85%',
      once: true,
      invalidateOnRefresh: true,
    },
  })

  // 1. Heading elements fade/slide in
  tl.from(headingEls, {
    y: 40,
    opacity: 0,
    duration: 1.0,
    ease: 'power1.inOut',
    stagger: 0.12,
  })

  // 2. Lines draw in left → right via clip-path reveal, staggered
  tl.to(
    lineImgs,
    {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.4,
      ease: 'power2.inOut',
      stagger: 0.15,
    },
    '-=0.4'
  )

  // 3. Glass panel fades in after lines complete
  if (glassPanel) {
    tl.to(
      glassPanel,
      {
        opacity: 1,
        duration: 0.6,
        ease: 'power1.out',
        immediateRender: false,
      },
      '+=0.1'
    )
  }
}
