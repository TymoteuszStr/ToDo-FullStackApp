<template>
  <button class="float-button">+</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FloatButton",
  props: {
    position: {},
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.float-button {
  @include flex-center;
  position: fixed;
  bottom: 80px;
  right: 60px;
  min-width: 50px;
  min-height: 50px;
  border-radius: 50%;
  background: linear-gradient(90deg, rgb(72, 182, 157), rgb(52, 124, 143));
  color: whitesmoke;
  font-size: 30px;
}
</style>
