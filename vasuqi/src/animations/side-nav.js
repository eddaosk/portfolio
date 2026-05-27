export function initSideNav() {
  const sections = [
    { id: 'intro-animation',          label: 'Intro' },
    { id: 'hero',                     label: 'Hero' },
    { id: 'the-gap',                  label: 'The Gap' },
    { id: 'targets-are-set',           label: 'The Targets Are Set' },
    { id: 'where-vasuqi-fits',        label: 'Where Vāsuqi Fits' },
    { id: 'what-its-built-to-change', label: "What It's Built to Change" },
    { id: 'how-it-works',             label: 'How It Works' },
  ]

  // Build nav element
  const nav = document.createElement('nav')
  nav.setAttribute('aria-label', 'Page sections')
  nav.className = 'fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3'

  sections.forEach(({ id, label }) => {
    const a = document.createElement('a')
    a.href = `#${id}`
    a.className = 'side-nav__anchor'
    a.dataset.section = id
    a.setAttribute('aria-label', label)
    a.setAttribute('aria-current', 'false')
    a.innerHTML = `<span class="side-nav__dot" aria-hidden="true"></span><span class="side-nav__label">${label}</span>`
    nav.appendChild(a)
  })

  document.querySelector('main#main-content')?.prepend(nav)

  // IntersectionObserver for active section tracking
  const anchors = nav.querySelectorAll('.side-nav__anchor')

  // Use rootMargin strategy for sections taller than viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        anchors.forEach(a => {
          const isActive = a.dataset.section === entry.target.id
          a.classList.toggle('side-nav__anchor--active', isActive)
          a.setAttribute('aria-current', isActive ? 'location' : 'false')
        })
      }
    })
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 })

  sections.forEach(({ id }) => {
    const el = document.getElementById(id)
    // intro-animation is display:none on load — only observe if visible
    if (el && el.style.display !== 'none') observer.observe(el)
  })
}
