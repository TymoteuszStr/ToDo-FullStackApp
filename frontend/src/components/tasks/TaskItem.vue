<template>
  <div class="item" @click="itemHandleClick">
    <p class="item__description">{{ task.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Task from "../../models/taskModel";

type TaskProps = {
  task: Task;
};

export default defineComponent({
  name: "Tasks",
  props: {
    task: Object as () => TaskProps,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";
.item {
  @include flex-center;
  position: relative;
  width: 80%;
  border-radius: 9px;
  color: $font-color;
  margin: 9px 0px;
  min-height: 40px;
  background: rgba(255,255,255,0.08);
  &__description {
    padding: 7px 40px 7px 25px;
  }
}
</style>
