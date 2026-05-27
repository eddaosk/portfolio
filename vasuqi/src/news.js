import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE, WATER_STAGGER } from './animations/constants.js'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
  // News & events section entrance
  gsap.from('#section-news .section-heading', {
    y: 30,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'section-news-heading',
      trigger: '#section-news',
      start: 'top 75%',
      once: true
    }
  })

  gsap.from('#section-news .news-card', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: 'section-news-cards',
      trigger: '#section-news',
      start: 'top 70%',
      once: true
    }
  })

  // Documents section entrance
  gsap.from('#section-docs .section-heading', {
    y: 30,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'section-docs-heading',
      trigger: '#section-docs',
      start: 'top 75%',
      once: true
    }
  })

  gsap.from('#section-docs .download-card', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: 'section-docs-cards',
      trigger: '#section-docs',
      start: 'top 70%',
      once: true
    }
  })

  // Press & Brand section entrance
  gsap.from('#section-press .section-heading', {
    y: 30,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'section-press-heading',
      trigger: '#section-press',
      start: 'top 75%',
      once: true
    }
  })

  gsap.from('#section-press .download-card', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: 'section-press-cards',
      trigger: '#section-press',
      start: 'top 70%',
      once: true
    }
  })
})
