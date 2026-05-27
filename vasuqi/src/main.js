import { initIntroAnimation } from './animations/intro.js'
import { initFloatingLight } from './animations/floating-light.js'
import { initScrollAnimations } from './animations/scroll.js'
import { initSideNav } from './animations/side-nav.js'
import { initGapAnimation } from './animations/gap-animation.js'

document.addEventListener('DOMContentLoaded', () => {
  initIntroAnimation()
  initFloatingLight()
  initScrollAnimations()
  initSideNav()
  initGapAnimation()

  const video = document.querySelector('#hero video')
  if (video && matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause()
    video.removeAttribute('autoplay')
  }
})
