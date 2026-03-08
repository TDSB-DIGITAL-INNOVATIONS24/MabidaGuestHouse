/* ================================================================
   MABIDA GUEST HOUSE — Main JS
   Production Build v1.0 — TDSB Digital Innovations
================================================================ */
'use strict';

(function(){

  /* ── Navbar scroll shadow ─────────────────────────────────── */
  var navbar = document.getElementById('navbar');
  if(navbar){
    window.addEventListener('scroll', function(){
      navbar.classList.toggle('scrolled', window.scrollY > 24);
    }, {passive:true});
  }

  /* ── Mobile nav ───────────────────────────────────────────── */
  var burger = document.getElementById('navBurger');
  var links  = document.getElementById('navLinks');
  var close  = document.getElementById('navClose');

  function openNav(){
    if(links) links.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav(){
    if(links) links.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  if(burger) burger.addEventListener('click', openNav);
  if(close)  close.addEventListener('click',  closeNav);

  /* ── Smooth scroll ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var id = this.getAttribute('href');
      if(id === '#') return;
      var target = document.querySelector(id);
      if(target){
        e.preventDefault();
        closeNav();
        var offset = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({top: offset, behavior:'smooth'});
      }
    });
  });

  /* ── Hero slider ──────────────────────────────────────────── */
  var slides = document.querySelectorAll('.hero__slide');
  var dots   = document.querySelectorAll('.hero__dot');
  var current = 0;
  var timer;

  function goToSlide(n){
    slides[current].classList.remove('active');
    if(dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if(dots[current]) dots[current].classList.add('active');
  }

  function nextSlide(){ goToSlide(current + 1); }
  function prevSlide(){ goToSlide(current - 1); }

  function startAuto(){
    clearInterval(timer);
    timer = setInterval(nextSlide, 6000);
  }

  if(slides.length > 0){
    startAuto();
    var btnNext = document.getElementById('heroNext');
    var btnPrev = document.getElementById('heroPrev');
    if(btnNext) btnNext.addEventListener('click', function(){ nextSlide(); startAuto(); });
    if(btnPrev) btnPrev.addEventListener('click', function(){ prevSlide(); startAuto(); });
    dots.forEach(function(dot, i){
      dot.addEventListener('click', function(){ goToSlide(i); startAuto(); });
    });
  }

  /* ── Scroll reveal ────────────────────────────────────────── */
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.08, rootMargin: '0px 0px -36px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){ observer.observe(el); });

  /* ── Counter animation ────────────────────────────────────── */
  function animateCounter(el){
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || '';
    var decimals = el.dataset.decimals || 0;
    var current = 0;
    var steps = 36;
    var increment = target / steps;
    var t = setInterval(function(){
      current = Math.min(current + increment, target);
      el.textContent = parseFloat(current.toFixed(decimals)) + suffix;
      if(current >= target) clearInterval(t);
    }, 45);
  }
  var cObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ animateCounter(e.target); cObs.unobserve(e.target); }
    });
  }, {threshold: 0.5});
  document.querySelectorAll('[data-count]').forEach(function(el){ cObs.observe(el); });

  /* ── Active nav link on scroll ───────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navAs = document.querySelectorAll('.navbar__links a[href^="#"]');
  function updateActiveLink(){
    var scrollY = window.scrollY;
    sections.forEach(function(sec){
      var top = sec.offsetTop - 90;
      var bot = top + sec.offsetHeight;
      var id  = '#' + sec.id;
      if(scrollY >= top && scrollY < bot){
        navAs.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === id); });
      }
    });
  }
  window.addEventListener('scroll', updateActiveLink, {passive:true});

  /* ── Contact form feedback (static) ──────────────────────── */
  var form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.style.background = '#1ebe5d';
      setTimeout(function(){ btn.textContent = orig; btn.style.background = ''; }, 3500);
      form.reset();
    });
  }

})();
