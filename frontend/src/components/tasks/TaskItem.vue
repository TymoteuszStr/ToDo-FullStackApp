import Task from '../../../../backend/src/db/models/taskModel';
<template>
  <div class="item">
    <div class="item__description">{{ task.description }}</div>
  </div>
</template>

<script lang="ts">
import Task from "@/models/taskModel";
import { defineComponent } from "vue";

type TaskProps = {
  task: Task;
};

export default defineComponent({
  name: "Tasks",
  props: {
    task: Object as () => TaskProps,
  },
  setup(props) {
    console.log(props.task);

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
  background-color: #fff;
  border-radius: 6px;
  margin: 5px 0px;
  min-height: 40px;
  &__description {
  }
}
</style>
