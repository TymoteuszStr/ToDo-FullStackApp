<template>
  <div class="taskContainer">
    <TaskItem v-for="(task, index) in allTasks" :key="index" :task="task" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import TaskItem from "./TaskItem.vue";
import { useStore } from "vuex";
import { GET_TASKS } from "@/store/types/task.type";

export default defineComponent({
  name: "Tasks",
  components: { TaskItem },
  setup() {
    const store = useStore();
    const allTasks = computed(() => store.getters.allTasks);
    function getAllTasks() {
      store.dispatch(GET_TASKS);
    }
    getAllTasks();

    return { allTasks };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.taskContainer {
  @include flex-center;
  @include disable-select;
  position: relative;
  flex-direction: column;
}
</style>
