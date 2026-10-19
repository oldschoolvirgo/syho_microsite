const sectionLinks = [...document.querySelectorAll('.sidebar-link')];
const sections = sectionLinks.map(link => document.querySelector(link.hash));
let scrollPending = false;

function updateActiveSection() {
  const marker = window.innerHeight * 0.35;
  let active = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= marker) active = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    active = sections[sections.length - 1];
  }
  for (const link of sectionLinks) {
    const selected = link.hash === `#${active.id}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scrollPending = false;
}

window.addEventListener('scroll', () => {
  if (!scrollPending) {
    scrollPending = true;
    window.requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
window.addEventListener('pageshow', updateActiveSection);
updateActiveSection();
