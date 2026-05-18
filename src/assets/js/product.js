import Alpine from 'alpinejs';

Alpine.data('productGallery', () => ({
  activeImage: 0,
  zoomed: false,
  zoomX: 0,
  zoomY: 0,

  setImage(index) {
    this.activeImage = index;
  },

  prevImage(total) {
    this.activeImage = (this.activeImage - 1 + total) % total;
  },

  nextImage(total) {
    this.activeImage = (this.activeImage + 1) % total;
  },

  toggleZoom(e) {
    this.zoomed = !this.zoomed;
    if (!this.zoomed) return;
    this.updateZoom(e);
  },

  updateZoom(e) {
    if (!this.zoomed) return;
    const rect = e.target.getBoundingClientRect();
    this.zoomX = ((e.clientX - rect.left) / rect.width) * 100;
    this.zoomY = ((e.clientY - rect.top) / rect.height) * 100;
  },
}));

Alpine.data('stickyAddToCart', () => ({
  visible: false,

  init() {
    const form = document.getElementById('product-form');
    if (!form) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        this.visible = !entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(form);
  },
}));
