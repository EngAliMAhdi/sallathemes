import Alpine from 'alpinejs';

Alpine.data('cartPage', () => ({
  items: [],
  couponCode: '',
  couponApplied: false,
  couponDiscount: 0,

  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  get total() {
    return this.subtotal - this.couponDiscount;
  },

  updateQuantity(id, qty) {
    const item = this.items.find((i) => i.id === id);
    if (item) item.quantity = Math.max(1, qty);
  },

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
  },

  applyCoupon() {
    this.couponApplied = true;
    this.couponDiscount = this.subtotal * 0.1;
  },
}));

Alpine.data('floatingCart', () => ({
  open: false,
  items: [],

  get count() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get total() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  toggle() {
    this.open = !this.open;
  },

  removeItem(id) {
    this.items = this.items.filter((i) => i.id !== id);
  },
}));
