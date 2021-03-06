<template lang="html">
  <transition name="collapsing"
    @enter="expanding"
    @afterEnter="clearHeight"
    @leave="collapsing"
    @afterLeave="clearHeight">
    <div v-show="show">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
    accordion: {
      type: String,
      default: '',
    },
    direction: {
      type: String,
      default: 'vertical', // 'vertical'|'horizontal'
    },
  },
  data() {
    return {
      show: this.expanded
    };
  },
  computed: {
    state() {
      return {
        id: this.id,
        expanded: this.show,
        accordion: this.accordion,
      };
    },
  },
  watch: {
    expanded(val) {
      this.show = val;
    }
  },
  methods: {
    expanding(el) {
      const style = () => window.getComputedStyle(el);

      if (this.direction === 'vertical') {
        const realHeight = style().height;
        el.style.maxHeight = '0px';
        el.offsetHeight; // Force repaint
        el.style.maxHeight = realHeight;
      } else {
        el.style.maxWidth = 'none';
        const { width, height } = style();
        el.style.maxWidth = '0px';
        el.offsetWidth; // Force repaint
        el.style.maxWidth = width;
        el.style.maxHeight = height;
      }
    },
    collapsing(el) {
      const style = () => window.getComputedStyle(el);

      if (this.direction === 'vertical') {
        el.style.maxHeight = style().height; // real height.
        el.offsetHeight; // Force repaint
        el.style.maxHeight = '0px';
      } else {
        const { width, height } = style();
        el.style.maxWidth = width;
        el.style.maxHeight = height;
        el.offsetWidth; // Force repaint
        el.style.maxWidth = '0px';
      }
    },
    clearHeight(el) {
      el.style.maxWidth = '';
      el.style.maxHeight = '';
    },

    /**
     * toggle collapse item.
     *
     * @param {string} id collapse-id.
     * @param {string} action toggle|show|hide
     * @param {function|null} cb (state) => void
     */
    toggleCollapse(id, action = 'toggle', cb = null) {
      if (id !== this.id) return;
      switch (action.toLowerCase()) {
        case 'show': this.show = true; break;
        case 'hide': this.show = false; break;
        case 'toggle':
        default: this.show = !this.show;
      }
      if (typeof cb === 'function') cb(this.state); // return to callback.
      this.emitCurrentState();
    },

    /**
     * toggle accordion
     * @param {string} accordion accordion group name.
     * @param {string} id collapse id.
     * @param {string} action toggle|show|hide
     */
    toggleAccordion(accordion, id, action = 'toggle') {
      if (accordion !== this.accordion) return;
      const isSelf = this.id === id;
      switch (action.toLowerCase()) {
        case 'show': this.show = isSelf ? true : false; break;
        case 'hide': if (isSelf) this.show = false; break;
        case 'toggle':
        default: this.show = isSelf ? !this.show : false;
      }
      this.emitCurrentState();
    },
    // emit collapse or accordion's state to $root.
    emitCurrentState() {
      this.$root.$emit('collapse-state', this.state);
      this.$emit('state', this.state);
    },
  },
  beforeMount() {
    this.$root.$on('collapse-toggle', this.toggleCollapse.bind(this));
    if (this.accordion) {
      this.$root.$on('accordion-toggle', this.toggleAccordion.bind(this));
    }
    this.emitCurrentState();
  }
}
</script>
