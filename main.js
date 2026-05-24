/* ============================================
  ETEC em ação — main.js
  ============================================ */

/* ---- Data ---- */
const curtas = {
  1: {
    title: 'Entre Sombras',
    genre: 'Drama',
    desc: 'Um jovem fotógrafo descobre uma série de imagens perturbadoras no arquivo de seu avô falecido, revelando segredos que mudam sua visão de família e identidade.',
    youtubeId: 'dQw4w9WgXcQ', // Substitua pelo ID real do YouTube
  },
  2: {
    title: 'O Último Andar',
    genre: 'Suspense',
    desc: 'Numa noite chuvosa, uma mulher ouve passos no apartamento acima — mas o inquilino desse andar morreu há três dias. O que, ou quem, está lá em cima?',
    youtubeId: 'dQw4w9WgXcQ', // Substitua pelo ID real do YouTube
  },
  3: {
    title: 'Reunião de Família',
    genre: 'Comédia',
    desc: 'Quando três irmãos tentam montar um presente surpresa para a mãe no dia das mães, tudo que pode dar errado, dá errado — e de forma muito errada. Uma comédia sobre amor, caos e irmandade.',
    youtubeId: 'dQw4w9WgXcQ', // Substitua pelo ID real do YouTube
  },
  4: {
    title: 'Cidade Invisível',
    genre: 'Documentário',
    desc: 'Um retrato íntimo de trabalhadores noturnos da cidade — o padeiro, a faxineira, o taxista — e as vidas que habitam as horas que o mundo ignora.',
    youtubeId: 'dQw4w9WgXcQ', // Substitua pelo ID real do YouTube
  },
};

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Mobile menu ---- */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  // animate spans into X
  const spans = navToggle.querySelectorAll('span');
  if (open) {
    spans[0].style.cssText = 'transform: translateY(6.5px) rotate(45deg)';
    spans[1].style.cssText = 'opacity: 0; transform: scaleX(0)';
    spans[2].style.cssText = 'transform: translateY(-6.5px) rotate(-45deg)';
  } else {
    spans.forEach(s => s.removeAttribute('style'));
  }
});

// close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.querySelectorAll('span').forEach(s => s.removeAttribute('style'));
  });
});

/* ---- Smooth nav active state ---- */
const sections = document.querySelectorAll('section[id], footer');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ---- Scroll reveal ---- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

// Add reveal classes to elements
document.querySelectorAll('.sobre-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1 > 4 ? 4 : i + 1}`);
  revealObserver.observe(el);
});
document.querySelectorAll('.curta-card').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1 > 4 ? 4 : i + 1}`);
  revealObserver.observe(el);
});
document.querySelectorAll('.contato-item').forEach((el, i) => {
  el.classList.add('reveal', `reveal-delay-${i + 1}`);
  revealObserver.observe(el);
});
document.querySelectorAll('.section-header, .sobre-lead').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ---- Modal ---- */
const modalOverlay = document.getElementById('modalOverlay');
const modal        = document.getElementById('modal');
const modalTitle   = document.getElementById('modalTitle');
const modalGenre   = document.getElementById('modalGenre');
const modalDesc    = document.getElementById('modalDesc');
const modalVideo   = document.getElementById('modalVideo');

function openModal(id) {
  const curta = curtas[id];
  if (!curta) return;

  modalTitle.textContent = curta.title;
  modalGenre.textContent = curta.genre;
  modalDesc.textContent  = curta.desc;

  // Build YouTube embed
  if (curta.youtubeId) {
    modalVideo.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${curta.youtubeId}?autoplay=1&rel=0&modestbranding=1"
        title="${curta.title}"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    `;
  } else {
    modalVideo.innerHTML = `
      <div class="modal-video-placeholder">
        <div class="big-play">▶</div>
        <p>Vídeo em breve</p>
      </div>
    `;
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  // Stop video by clearing iframe src
  setTimeout(() => { modalVideo.innerHTML = ''; }, 350);
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
});

// Expose globally for onclick handlers
window.openModal  = openModal;
window.closeModal = closeModal;

/* ---- Parallax on hero glow (subtle) ---- */
const heroGlow = document.querySelector('.hero-glow');
if (heroGlow) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
}

/* ---- Active nav link style injection ---- */
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--white) !important; }
.nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(style);
