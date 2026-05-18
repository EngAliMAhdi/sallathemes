import '../styles/app.css';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.data('themeApp', () => ({
  darkMode: true,
  mobileMenuOpen: false,
  searchOpen: false,
  cartOpen: false,
  cartCount: 0,
  scrolled: false,

  init() {
    this.darkMode = document.documentElement.classList.contains('dark');

    window.addEventListener('scroll', () => {
      this.scrolled = window.scrollY > 50;
    });

    this.$watch('darkMode', (val) => {
      document.documentElement.classList.toggle('dark', val);
      localStorage.setItem('theme-dark-mode', val);
    });
  },

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  },

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  },

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
  },

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  },
}));

Alpine.data('countdown', (endDate) => ({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
  expired: false,
  timer: null,

  init() {
    this.startCountdown(endDate);
  },

  startCountdown(end) {
    const target = new Date(end).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        this.expired = true;
        clearInterval(this.timer);
        return;
      }

      this.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
      this.hours = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      this.minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      this.seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
    };

    tick();
    this.timer = setInterval(tick, 1000);
  },
}));

Alpine.data('productSlider', () => ({
  currentIndex: 0,
  itemsPerView: 4,

  init() {
    this.updateItemsPerView();
    window.addEventListener('resize', () => this.updateItemsPerView());
  },

  updateItemsPerView() {
    const w = window.innerWidth;
    if (w < 640) this.itemsPerView = 2;
    else if (w < 1024) this.itemsPerView = 3;
    else this.itemsPerView = 4;
  },

  next(total) {
    const max = total - this.itemsPerView;
    if (this.currentIndex < max) this.currentIndex++;
  },

  prev() {
    if (this.currentIndex > 0) this.currentIndex--;
  },
}));

Alpine.data('searchOverlay', () => ({
  query: '',
  results: [],
  loading: false,
  open: false,

  async search() {
    if (this.query.length < 2) {
      this.results = [];
      return;
    }
    this.loading = true;
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(this.query)}`);
      const data = await res.json();
      this.results = data.data || [];
    } catch (e) {
      this.results = [];
    }
    this.loading = false;
  },

  clear() {
    this.query = '';
    this.results = [];
  },
}));

Alpine.data('animateOnScroll', () => ({
  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.$el.classList.add('animate-on-scroll');
    observer.observe(this.$el);
  },
}));

Alpine.start();
