<template lang="html">
  <button type="button"
    :class="classObject"
    @click="onClick">
    <slot></slot>
  </button>
</template>

<script>
import { findAncestor, hide } from 'element-util';
import { makeIcon } from '../lib/util';

export default {
  props: {
    position: {
      type: String,
      default: '', // '' (no specified) | top-right | middle-right
    },
    action: {
      type: String,
      default: 'hide', // hide | remove | '' (no-action)
    },
    target: {
      type: String,
      default: '', // '' (parentNode) | selector
    },
    related: {
      type: Boolean,
      default: false, // If it true, parent node's style position is set 'relative'.
    }
  },
  data() {
    return {
      classObject: {
        'close-button': true,
        'at-corner': this.position == 'top-right',
        'at-right-middle': this.position == 'middle-right',
      }
    };
  },
  mounted() {
    if (this.related || this.position !== '') {
      this.$el.parentNode.style.position = 'relative';
    }
    if (this.$el.innerHTML === '') {
      // Appends 'close' icon if default slot is empty.
      this.$el.appendChild(makeIcon('close'));
    }
  },
  methods: {
    onClick(event) {
      const btn = event.currentTarget;
      const target = this.target
        ? findAncestor(btn, this.target)
        : btn.parentNode;

      this.$emit('close', target);
      if (this.action == 'hide') {
        hide(target);
      } else if (this.action == 'remove') {
        target.parentNode.removeChild(target);
      }
    }
  }
}
</script>
