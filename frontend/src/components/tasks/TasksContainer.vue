<template>
  <div class="task-container">
    <TaskItem
      v-for="(task, index) in allTasks"
      :key="index"
      :task="task"
      @taskClicked="taskClickedHandle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import TaskItem from "./TaskItem.vue";
import Task from "../../models/taskModel";
import { useStore } from "vuex";
import { DELETE_TASK, GET_TASKS } from "../../store/types/task.type";

export default defineComponent({
  name: "Tasks",
  components: { TaskItem },
  setup() {
    const { dispatch, getters } = useStore();
    const allTasks = computed(() => getters.allTasks);
    function getAllTasks() {
      dispatch(GET_TASKS);
    }
    const taskClickedHandle = (e: Task) => {
      dispatch(DELETE_TASK, e._id);
    };
    onMounted((): void => {
      getAllTasks();
    });
    return { allTasks, taskClickedHandle };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.task-container {
  @include flex-center;
  @include disable-select;
  position: relative;
  flex-direction: column;
}
</style>
