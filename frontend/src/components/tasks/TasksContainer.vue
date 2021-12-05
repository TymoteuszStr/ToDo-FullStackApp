<template>
  <div class="task-container">
    <TaskItem v-for="(task, index) in allTasks" :key="index" :task="task" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import TaskItem from "./taskItem/TaskItem.vue";
import { useStore } from "vuex";
import { GET_TASKS } from "../../store/types/task.type";

export default defineComponent({
  name: "Tasks",
  components: { TaskItem },
  setup() {
    const store = useStore();
    const allTasks = computed(() => store.getters.allTasks);
    function getAllTasks() {
      store.dispatch(GET_TASKS);
    }

    onMounted((): void => {
      getAllTasks();
    });
    return { allTasks };
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
  padding-bottom: 60px;
}
</style>
