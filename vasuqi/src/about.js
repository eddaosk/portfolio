import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  // "Why vāsuqi?" intro section entrance — heading
  gsap.from('#section-why h1', {
    y: 30,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'section-why-heading',
      trigger: '#section-why',
      start: 'top 75%',
      once: true
    }
  })

  // "Why vāsuqi?" body paragraphs entrance
  gsap.from('#section-why .about-why-body p', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: 'section-why-body',
      trigger: '#section-why',
      start: 'top 70%',
      once: true
    }
  })

  // Team section text block entrance (heading, subheading, intro paragraph)
  gsap.from('.team-section-text > *', {
    y: 24,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: 'team-section-text',
      trigger: '.team-section-text',
      start: 'top 75%',
      once: true
    }
  })

  // Team grid cards entrance
  gsap.from('.team-card', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: 'team-grid-cards',
      trigger: '#team-grid',
      start: 'top 70%',
      once: true
    }
  })
})
