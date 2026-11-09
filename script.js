const root = document.documentElement;
const topbar = document.querySelector('.topbar');
const progress = document.querySelector('.progress span');
const glow = document.querySelector('.cursor-glow');
const hero = document.querySelector('.hero');
const sculpture = document.querySelector('.cine-sculpture');
const stage = document.querySelector('.genre-stage');
const stageIndex = stage.querySelector('.stage-index');
const stageTitle = stage.querySelector('h3');
const stageText = stage.querySelector('.stage-copy > p:last-child');
const stageStat = stage.querySelector('.stage-caption b');
const stageOrbit = stage.querySelector('.stage-orbit i');

const themes = {
  thriller: 'radial-gradient(circle at 74% 50%, rgba(244,104,66,.24), transparent 10%), linear-gradient(125deg, #101521, #273044)',
  'sci-fi': 'radial-gradient(circle at 72% 55%, rgba(57,198,255,.25), transparent 9%), linear-gradient(125deg, #071625, #15354d)',
  drama: 'radial-gradient(circle at 75% 50%, rgba(244,192,115,.27), transparent 10%), linear-gradient(125deg, #35231d, #715039)',
  horror: 'radial-gradient(circle at 73% 46%, rgba(189,79,123,.25), transparent 9%), linear-gradient(125deg, #170f1a, #312038)',
  romance: 'radial-gradient(circle at 70% 48%, rgba(242,154,178,.25), transparent 10%), linear-gradient(125deg, #2a1424, #653542)',
  comedy: 'radial-gradient(circle at 71% 47%, rgba(233,217,74,.25), transparent 9%), linear-gradient(125deg, #283023, #566137)'
};

document.querySelectorAll('.genre-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelector('.genre-card.active')?.classList.remove('active');
    card.classList.add('active');
    stageIndex.innerHTML = `${card.dataset.number} <span>/ 06</span>`;
    stageTitle.textContent = card.dataset.title;
    stageText.textContent = card.dataset.copy;
    stageStat.textContent = card.dataset.stat;
    stage.style.background = themes[card.dataset.genre];
    stageOrbit.style.background = card.dataset.hue;
    stageOrbit.style.boxShadow = `0 0 29px ${card.dataset.hue}`;
    stage.animate([{ opacity: .55, transform: 'scale(.988)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 360, easing: 'ease-out' });
  });
});

const moods = [
  { until: 20, name: 'Тихая драма', quote: '«Иногда самое громкое — то, что не произнесли»', icon: '◐', color: '#9bcde8' },
  { until: 43, name: 'Мягкая романтика', quote: '«Где-то между музыкой и взглядом случается сюжет»', icon: '♡', color: '#f29ab2' },
  { until: 62, name: 'Смелая фантастика', quote: '«Завтра начинается там, где заканчивается привычное»', icon: '◌', color: '#39c6ff' },
  { until: 82, name: 'Ночной триллер', quote: '«Когда экран темнеет, любая тень становится сюжетом»', icon: '◒', color: '#f46842' },
  { until: 100, name: 'Пульс хоррора', quote: '«В темноте у воображения нет ограничений»', icon: '◓', color: '#bd4f7b' }
];
const range = document.querySelector('#mood-range');
const moodName = document.querySelector('.mood-result h3');
const moodQuote = document.querySelector('.mood-quote');
const moodSign = document.querySelector('.mood-sign');
range.addEventListener('input', () => {
  const mood = moods.find(item => range.value <= item.until);
  moodName.textContent = mood.name;
  moodQuote.textContent = `«${mood.quote.slice(1, -1)}»`;
  moodSign.textContent = mood.icon;
  moodSign.style.color = mood.color;
  moodName.animate([{ transform: 'translateY(7px)', opacity: .3 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 210 });
});

const modal = document.querySelector('.intro-modal');
document.querySelector('[data-open-modal]').addEventListener('click', () => modal.showModal());
document.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => modal.close()));
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
  topbar.classList.toggle('stuck', window.scrollY > 60);
}, { passive: true });

window.addEventListener('pointermove', event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

hero.addEventListener('pointermove', event => {
  if (window.innerWidth < 700) return;
  const bounds = hero.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - .5;
  const y = (event.clientY - bounds.top) / bounds.height - .5;
  sculpture.style.transform = `translate3d(${x * 22}px, calc(-45% + ${y * 18}px), ${Math.abs(x) * 14}px) rotateX(${4 - y * 8}deg) rotateY(${-10 + x * 17}deg)`;
});
hero.addEventListener('pointerleave', () => {
  if (window.innerWidth >= 700) sculpture.style.transform = 'translate3d(0,-45%,0) rotateX(4deg) rotateY(-10deg)';
});
