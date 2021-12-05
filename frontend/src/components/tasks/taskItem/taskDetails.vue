<template>
  <div class="details">
    <separator>Szczegóły</separator>
    <p class="details__description"><slot /></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import separator from "./Separator.vue";

export default defineComponent({
  name: "TaskDetail",
  components: { separator },
});
</script>

<style lang="scss" scoped>
.details {
  height: calc(180px - 2em);

  &__description {
    display: flex;
    color: rgba(255, 255, 255, 0.5);
    width: 100%;
    word-break: break-word;
    padding: 5px 15px;
  }
}
</style>
