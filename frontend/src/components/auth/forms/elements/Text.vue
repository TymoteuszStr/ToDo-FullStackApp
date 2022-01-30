<template>
  <p class="text" :class="{ warning: warning }"><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Text",
  props: {
    warning: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.text {
  color: rgba(255, 255, 255, 0.5);
  margin: 10px;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    transform: scale(1.06);
  }
}

@media screen and (min-width: 1400px) {
  .text {
    color: $navy-blue;
  }
}
.warning {
  color: $red;
  &:hover {
    cursor: default;
    transform: scale(1);
  }
}
</style>
