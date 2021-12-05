<template>
  <div class="task" ref="taskRef" @click="$emit('taskClick', task)">
    <taskGeneral @arrowClick="toggleDetails" :title="task.title" />
    <taskDetails v-show="detailToggler">{{ task.description }}</taskDetails>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Task from "../../../models/taskModel";
import taskGeneral from "./taskGeneral.vue";
import taskDetails from "./taskDetails.vue";
type TaskProps = {
  task: Task;
};

export default defineComponent({
  name: "TaskItem",
  components: { taskGeneral, taskDetails },
  props: { task: Object as () => TaskProps },
  setup() {
    const taskRef = ref();
    let detailToggler = ref(false);
    const toggleDetails = () => {
      taskRef.value.classList.toggle("showDetails");
      detailToggler.value = !detailToggler.value;
    };
    return { toggleDetails, taskRef, detailToggler };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";
.task {
  color: $font-color;
  position: relative;
  width: 80%;
  height: 50px;
  border-radius: 9px;
  margin: 9px 0px;
  background: rgba(255, 255, 255, 0.08);
  transition: height ease-out 0.3s;
}

.showDetails {
  height: 250px;
}
</style>
