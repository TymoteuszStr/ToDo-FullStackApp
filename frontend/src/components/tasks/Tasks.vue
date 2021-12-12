<template>
  <div class="task-container">
    <TaskItem
      v-for="(task, index) in allTasks"
      :key="index"
      :task="task"
      @delete="deleteHandle"
      @edit="editHandle"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import TaskItem from "./taskItem/TaskItem.vue";
import Task from "@/models/taskModel";
import { useStore } from "vuex";
import { DELETE_TASK, GET_TASKS } from "@/store/types/task.type";

export default defineComponent({
  name: "Tasks",
  components: { TaskItem },
  setup() {
    const { dispatch, getters } = useStore();
    const allTasks = computed(() => getters.allTasks);
    function getAllTasks() {
      dispatch(GET_TASKS);
    }

    const deleteHandle = (e: Task) => {
      // dispatch(DELETE_TASK, e._id);
    };
    const editHandle = (e: Task) => {
      console.log("działa");
      console.log(e);
    };

    onMounted((): void => {
      getAllTasks();
    });
    return { allTasks, deleteHandle, editHandle };
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
