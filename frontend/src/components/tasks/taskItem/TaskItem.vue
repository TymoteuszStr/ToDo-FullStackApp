<template>
  <div class="task" ref="taskRef">
    <taskGeneral @arrowClick="toggleDetails" :title="task.title" @editTitle="editTitleHandle" />
    <taskDetails v-show="detailToggler" :description="task.description" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, Ref } from "vue";
import Task from "@/models/taskModel";
import taskGeneral from "./taskGeneral.vue";
import taskDetails from "./taskDetails.vue";

export default defineComponent({
  name: "TaskItem",
  components: { taskGeneral, taskDetails },
  props: { task: { type: Object as PropType<Task>, require: true } },
  setup(props, { emit }) {
    const taskRef = ref();
    let detailToggler = ref(false);
    const toggleDetails = () => {
      taskRef.value.classList.toggle("showDetails");
      detailToggler.value = !detailToggler.value;
    };

    const editTitleHandle = (e: Event) => {
      emit("edit", e);
    };
    return { toggleDetails, taskRef, detailToggler, editTitleHandle };
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
