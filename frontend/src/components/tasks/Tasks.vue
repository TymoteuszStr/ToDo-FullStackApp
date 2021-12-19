<template>
  <div class="task-container">
    <TaskItem
      v-for="(task, index) in allTasks"
      :key="index"
      :task="task"
      @delete="deleteHandle"
      @editProperty="(e) => editPropertyHandle(e, task._id)"
    />
    <TaskItem
      v-if="showNewToDo"
      id="newToDoTask"
      @editProperty="addNewToDoTask"
      class="popUpAnimation"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref } from "vue";
import TaskItem from "./taskItem/TaskItem.vue";
import Task from "@/models/taskModel";
import { useStore } from "vuex";
import { UPDATE_TASK_PROPERTY, GET_TASKS, POST_TASK } from "@/store/types/task.type";

export default defineComponent({
  name: "Tasks",
  components: { TaskItem },
  setup() {
    const { dispatch, getters } = useStore();
    const allTasks = computed(() => getters.allTasks);
    let showNewToDo = ref(false);

    const emitter = require("tiny-emitter/instance");
    emitter.on("addNewToDo", function () {
      showNewToDo.value = true;
      setTimeout(() => {
        const input: HTMLInputElement | null = document.querySelector("#newToDoTask input");
        input?.scrollIntoView({ behavior: "smooth" });
        input?.focus({ preventScroll: true });
      });
    });

    function getAllTasks() {
      dispatch(GET_TASKS);
    }

    function editPropertyHandle(e: {}, taskId: string) {
      dispatch(UPDATE_TASK_PROPERTY, { taskId, property: e });
    }

    async function addNewToDoTask(task: Task) {
      if (!task.title) {
        showNewToDo.value = false;
        return;
      }
      try {
        await dispatch(POST_TASK, task);
        showNewToDo.value = false;
      } catch (err) {
        showNewToDo.value = false;
      }
    }

    const deleteHandle = (e: Task) => {
      console.log(e);
      // dispatch(DELETE_TASK, e._id);
    };
    onMounted((): void => {
      getAllTasks();
    });

    return { allTasks, deleteHandle, editPropertyHandle, showNewToDo, addNewToDoTask };
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/animations.scss";

.task-container {
  @include flex-center;
  @include disable-select;
  position: relative;
  flex-direction: column;
  padding-bottom: 60px;
}

.popUpAnimation {
  animation: popUpNewToDo 0.3s ease-out;
}
</style>
