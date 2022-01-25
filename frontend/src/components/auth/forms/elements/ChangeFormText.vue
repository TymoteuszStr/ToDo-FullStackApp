<template>
  <p class="text"><slot /></p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ChangeFormText",
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.text {
  color: rgba(255, 255, 255, 0.5);
  margin: 10px;
  &:hover {
    cursor: pointer;
    transform: scale(1.06);
  }
}

@media screen and (min-width: 1140px) {
  .text {
    color: $navy-blue;
  }
}
</style>
