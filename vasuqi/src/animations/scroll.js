import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_EASE, WATER_DURATION, WATER_STAGGER } from './constants.js'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animate section elements in from y:40 opacity:0 on scroll-into-view.
 * once:true — plays once, does not reverse on scroll-out.
 *
 * @param {string} trigger  — CSS selector for the section element
 * @param {string} elements — CSS selector for the elements to animate
 */
function animateSection(trigger, elements) {
  const el = document.querySelector(trigger)
  if (!el) return

  gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    stagger: WATER_STAGGER,
    scrollTrigger: {
      id: trigger.replace(/^#/, '') + '-trigger',
      trigger,
      start: 'top 75%',
      once: true,
    },
  })
}

export function initScrollAnimations() {
  // #the-gap is fully handled by gap-animation.js (chart line draw-on + glass panel sequence)
  animateSection('#targets-are-set', '#targets-are-set .section-heading, #targets-are-set .section-body')
  animateSection('#where-vasuqi-fits', '#where-vasuqi-fits .section-heading, #where-vasuqi-fits .wvfit-subheading, #where-vasuqi-fits .wvfit-card, #where-vasuqi-fits .wvfit-tagline')
  animateSection('#what-its-built-to-change', '#what-its-built-to-change .section-heading, #what-its-built-to-change .benefit-blob-new')
  animateSection('#how-it-works', '#how-it-works .section-heading, #how-it-works .section-body, #how-it-works .hiw-card, #how-it-works .pollutant-card')

  // HIW connector line-draw: lines grow from callout edge toward reactor on scroll-in
  const scrollTriggerOpts = { trigger: '#how-it-works', start: 'top 75%', once: true }
  if (document.querySelector('#how-it-works .hiw-callout--left .hiw-callout__connector')) {
    gsap.from('#how-it-works .hiw-callout--left .hiw-callout__connector', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: WATER_DURATION.default,
      stagger: WATER_STAGGER * 1.5,
      ease: WATER_EASE,
      scrollTrigger: scrollTriggerOpts,
    })
  }
  if (document.querySelector('#how-it-works .hiw-callout--right .hiw-callout__connector')) {
    gsap.from('#how-it-works .hiw-callout--right .hiw-callout__connector', {
      scaleX: 0,
      transformOrigin: 'right',
      duration: WATER_DURATION.default,
      stagger: WATER_STAGGER * 1.5,
      ease: WATER_EASE,
      scrollTrigger: scrollTriggerOpts,
    })
  }
}
