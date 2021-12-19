<template>
  <div class="task-container">
    <TaskItem v-show="addNewToDo" id="newToDoTask" @editProperty="addNewToDoTask" />
    <TaskItem
      v-for="(task, index) in allTasks"
      :key="index"
      :task="task"
      @delete="deleteHandle"
      @editProperty="(e) => editPropertyHandle(e, task._id)"
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
    let addNewToDo = ref(false);

    const emitter = require("tiny-emitter/instance");
    emitter.on("addNewToDo", function () {
      addNewToDo.value = true;
      setTimeout(() => {
        const input: HTMLInputElement | null = document.querySelector("#newToDoTask input");
        input?.focus();
      });
    });

    function getAllTasks() {
      dispatch(GET_TASKS);
    }

    function editPropertyHandle(e: {}, taskId: string) {
      dispatch(UPDATE_TASK_PROPERTY, { taskId, property: e });
    }
    function addNewToDoTask(task: {}) {
      dispatch(POST_TASK, task);
    }

    const deleteHandle = (e: Task) => {
      // dispatch(DELETE_TASK, e._id);
    };
    onMounted((): void => {
      getAllTasks();
    });
    return { allTasks, deleteHandle, editPropertyHandle, addNewToDo, addNewToDoTask };
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
