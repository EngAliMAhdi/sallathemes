import Alpine from 'alpinejs';

Alpine.data('homeHero', () => ({
  currentSlide: 0,
  totalSlides: 0,
  autoplayInterval: null,

  init() {
    this.totalSlides = this.$refs.slides?.children.length || 0;
    if (this.totalSlides > 1) {
      this.startAutoplay();
    }
  },

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  },

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  },

  goToSlide(index) {
    this.currentSlide = index;
    this.resetAutoplay();
  },

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  },

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  },
}));

Alpine.data('flashSales', () => ({
  items: [],
  scrollPos: 0,

  scrollLeft() {
    const container = this.$refs.scrollContainer;
    container.scrollBy({ left: -300, behavior: 'smooth' });
  },

  scrollRight() {
    const container = this.$refs.scrollContainer;
    container.scrollBy({ left: 300, behavior: 'smooth' });
  },
}));

document.addEventListener('alpine:init', () => {});
