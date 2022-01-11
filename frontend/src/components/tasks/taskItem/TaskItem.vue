<template>
  <swiper class="taskWrapper" @swipeLeft="$emit('delete', task)">
    <div class="task" ref="taskRef">
      <TaskGeneral
        :title="task?.title"
        @editProperty="editPropertyHandle"
        @arrowClick="toggleDetails"
      />
      <TaskDetails :description="task?.description" @editProperty="editPropertyHandle" />
    </div>
  </swiper>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from "vue";
import Task from "@/models/taskModel";
import swiper from "@/components/shared/SwipeToRemove.vue";
import TaskDetails from "./elements/TaskDetails.vue";
import TaskGeneral from "./elements/TaskGeneral.vue";

export default defineComponent({
  name: "TaskItem",
  components: { swiper, TaskDetails, TaskGeneral },
  props: { task: { type: Object as PropType<Task>, require: false } },

  setup(props, { emit }) {
    const taskRef = ref();

    function toggleDetails() {
      if (taskRef.value.classList.contains("showDetails")) {
        taskRef.value.classList.remove("showDetails");
        return;
      }

      const allTasks = document.querySelectorAll(".task-container .task");
      allTasks.forEach((task) => {
        task.classList.remove("showDetails");
      });

      const allArrows = document.querySelectorAll(".task .general .arrow");
      allArrows.forEach((arrow) => {
        arrow.classList.remove("arrow--rotateUp");
      });

      taskRef.value.classList.add("showDetails");
    }

    function editPropertyHandle(e: Event) {
      emit("editProperty", e);
    }

    return { toggleDetails, taskRef, editPropertyHandle };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/variables.scss";

.taskWrapper {
  position: relative;
  width: 80%;
}
.task {
  height: $task-general-height;
  color: $font-color;
  border-radius: 9px;
  margin: 9px 0px;
  background: rgba(255, 255, 255, 0.08);
  transition: height ease-out 0.4s;
  overflow: hidden;
}

.showDetails {
  height: 250px;
}
</style>
