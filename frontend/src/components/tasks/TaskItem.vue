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
.item {
  @include flex-center;
  position: relative;
  width: 80%;
  border-radius: 6px;
  color: rgb(163, 163, 163);
  margin: 5px 0px;
  min-height: 40px;
  border: 1px solid grey;
  box-shadow: 1px 2px 3px 0px grey;
  &__description {
    padding: 7px 40px 7px 25px;
  }
}
</style>
