import { FORMSPREE_ENDPOINT } from './config.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WATER_DURATION, WATER_EASE } from './animations/constants.js'

gsap.registerPlugin(ScrollTrigger)

function showFormState(state) {
  document.getElementById('form-success').hidden = true
  document.getElementById('form-error').hidden = true
  if (state === 'success') {
    document.getElementById('form-success').hidden = false
  } else {
    document.getElementById('form-error').hidden = false
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Form submit handler — required fields: name and email only (AC13)
  const form = document.getElementById('contact-form')
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      // Validate required fields before posting
      const allFilled = ['name', 'email'].every(
        name => (data.get(name) || '').trim() !== ''
      )
      if (!allFilled) {
        showFormState('error')
        return
      }
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' }
        })
        showFormState(res.ok ? 'success' : 'error')
      } catch {
        showFormState('error')
      }
    })
  }

  // Scroll entrance animations for three-zone layout — once: true is mandatory
  gsap.from('.contact-photo-panel', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'contact-photo-enter',
      trigger: '.contact-photo-panel',
      start: 'top 80%',
      once: true
    }
  })

  gsap.from('.contact-info-zone', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'contact-info-enter',
      trigger: '.contact-info-zone',
      start: 'top 80%',
      once: true
    }
  })

  gsap.from('.contact-form-zone', {
    y: 20,
    opacity: 0,
    duration: WATER_DURATION.default,
    ease: WATER_EASE,
    scrollTrigger: {
      id: 'contact-form-enter',
      trigger: '.contact-form-zone',
      start: 'top 80%',
      once: true
    }
  })
})
