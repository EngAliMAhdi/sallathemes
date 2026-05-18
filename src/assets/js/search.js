import Alpine from 'alpinejs';

Alpine.data('smartSearch', () => ({
  query: '',
  results: [],
  loading: false,
  focused: false,
  debounceTimer: null,

  async handleInput() {
    clearTimeout(this.debounceTimer);
    if (this.query.length < 2) {
      this.results = [];
      return;
    }
    this.loading = true;

    this.debounceTimer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(this.query)}`);
        const data = await res.json();
        this.results = data.data?.slice(0, 8) || [];
      } catch (e) {
        this.results = [];
      }
      this.loading = false;
    }, 300);
  },

  selectResult(item) {
    if (item.url) {
      window.location.href = item.url;
    }
  },

  clear() {
    this.query = '';
    this.results = [];
  },

  handleKeydown(e) {
    if (e.key === 'Escape') {
      this.clear();
      this.$refs.input.blur();
    }
    if (e.key === 'Enter' && this.query.length >= 2) {
      window.location.href = `/search?q=${encodeURIComponent(this.query)}`;
    }
  },
}));
