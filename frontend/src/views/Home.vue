<template>
  <TasksContainer :tasks="allTasks" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { GET_TASKS } from "store/types/task.type";
import TasksContainer from "components/tasks/TasksContainer.vue";
import Task from "models/taskModel";
console.log("test");
import Vue from "vue";

export default defineComponent({
  name: "Home",
  components: { TasksContainer },
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

<style scoped lang="scss"></style>
